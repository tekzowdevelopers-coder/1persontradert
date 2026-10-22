import fs from "fs";
import path from "path";
import os from "os";
import { Order, ContactEnquiry, PaymentStatus, AccessStatus } from "./types";
import {
  isDbConfigured,
  dbGetAllOrders,
  dbSaveOrder,
  dbUpdateOrderStatus,
  dbGetAllEnquiries,
  dbSaveEnquiry,
} from "./db";

// In-memory fallback cache ensures operations NEVER crash if filesystem is read-only
let memoryOrders: Order[] = [];
let memoryEnquiries: ContactEnquiry[] = [];

// Determine safe storage directory:
// If running on Vercel/Lambda, use /tmp (which is writeable); otherwise use project ./data
const isServerless = Boolean(
  process.env.VERCEL ||
  process.env.AWS_LAMBDA_FUNCTION_NAME ||
  process.env.NETLIFY
);

const PRIMARY_DATA_DIR = path.join(process.cwd(), "data");
const TMP_DATA_DIR = path.join(os.tmpdir(), "1person-trader");

function getStorageDir(): string {
  if (isServerless) {
    try {
      if (!fs.existsSync(TMP_DATA_DIR)) {
        fs.mkdirSync(TMP_DATA_DIR, { recursive: true });
      }
      return TMP_DATA_DIR;
    } catch {
      return TMP_DATA_DIR;
    }
  }
  try {
    if (!fs.existsSync(PRIMARY_DATA_DIR)) {
      fs.mkdirSync(PRIMARY_DATA_DIR, { recursive: true });
    }
    return PRIMARY_DATA_DIR;
  } catch {
    // If primary is read-only, fallback to tmp
    try {
      if (!fs.existsSync(TMP_DATA_DIR)) {
        fs.mkdirSync(TMP_DATA_DIR, { recursive: true });
      }
      return TMP_DATA_DIR;
    } catch {
      return TMP_DATA_DIR;
    }
  }
}

function getFilePath(filename: string): string {
  const dir = getStorageDir();
  return path.join(dir, filename);
}

// Safely seed initial data if missing in target directory
function seedFromProjectIfAvailable(targetFile: string, filename: string) {
  try {
    if (!fs.existsSync(targetFile)) {
      const sourceFile = path.join(PRIMARY_DATA_DIR, filename);
      if (fs.existsSync(sourceFile)) {
        const content = fs.readFileSync(sourceFile, "utf8");
        fs.writeFileSync(targetFile, content, "utf8");
      }
    }
  } catch {
    // Ignore seed copy errors
  }
}

// ------------------- ORDERS -------------------

export async function getAllOrdersAsync(): Promise<Order[]> {
  if (isDbConfigured()) {
    const dbOrders = await dbGetAllOrders();
    if (dbOrders !== null) return dbOrders;
  }
  return getAllOrders();
}

export function getAllOrders(): Order[] {
  const filePath = getFilePath("orders.json");
  seedFromProjectIfAvailable(filePath, "orders.json");

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw) as Order[];
      memoryOrders = parsed;
      return parsed;
    }
    // Also check primary if tmp is empty
    const primaryFile = path.join(PRIMARY_DATA_DIR, "orders.json");
    if (fs.existsSync(primaryFile)) {
      const raw = fs.readFileSync(primaryFile, "utf8");
      const parsed = JSON.parse(raw) as Order[];
      memoryOrders = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn("Could not read orders file, using in-memory:", err);
  }

  return memoryOrders;
}

export async function getOrderByIdAsync(id: string): Promise<Order | undefined> {
  const orders = await getAllOrdersAsync();
  return orders.find((o) => o.id === id || o.orderNumber === id);
}

export function getOrderById(id: string): Order | undefined {
  const orders = getAllOrders();
  return orders.find((o) => o.id === id || o.orderNumber === id);
}

export async function saveOrderAsync(order: Order): Promise<Order> {
  // 1. Try PostgreSQL if configured
  if (isDbConfigured()) {
    const saved = await dbSaveOrder(order);
    if (saved) {
      // Also update memory
      const idx = memoryOrders.findIndex((o) => o.id === order.id);
      if (idx >= 0) memoryOrders[idx] = order;
      else memoryOrders.unshift(order);
      return order;
    }
  }
  // 2. Fallback to file/memory
  return saveOrder(order);
}

export function saveOrder(order: Order): Order {
  // Update memory cache immediately
  const existingIdx = memoryOrders.findIndex((o) => o.id === order.id);
  if (existingIdx >= 0) {
    memoryOrders[existingIdx] = order;
  } else {
    memoryOrders.unshift(order);
  }

  // Persist to disk safely without throwing
  try {
    const filePath = getFilePath("orders.json");
    fs.writeFileSync(filePath, JSON.stringify(memoryOrders, null, 2), "utf8");
  } catch (err) {
    console.warn("Notice: Disk write skipped on read-only serverless environment. Memory order retained:", err);
  }

  return order;
}

export async function updateOrderStatusAsync(
  id: string,
  updates: {
    paymentStatus?: PaymentStatus;
    accessStatus?: AccessStatus;
    providerPaymentId?: string;
    fulfilmentNotes?: string;
  }
): Promise<Order | null> {
  if (isDbConfigured()) {
    const ok = await dbUpdateOrderStatus(id, updates);
    if (ok) {
      const order = await getOrderByIdAsync(id);
      if (order) return order;
    }
  }
  return updateOrderStatus(id, updates);
}

export function updateOrderStatus(
  id: string,
  updates: {
    paymentStatus?: PaymentStatus;
    accessStatus?: AccessStatus;
    providerPaymentId?: string;
    fulfilmentNotes?: string;
  }
): Order | null {
  const orders = getAllOrders();
  const idx = orders.findIndex((o) => o.id === id || o.orderNumber === id);
  if (idx === -1) {
    // Check in-memory
    const memIdx = memoryOrders.findIndex((o) => o.id === id || o.orderNumber === id);
    if (memIdx === -1) return null;
    memoryOrders[memIdx] = {
      ...memoryOrders[memIdx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return memoryOrders[memIdx];
  }

  const updated: Order = {
    ...orders[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  orders[idx] = updated;
  memoryOrders = orders;

  try {
    const filePath = getFilePath("orders.json");
    fs.writeFileSync(filePath, JSON.stringify(orders, null, 2), "utf8");
  } catch (err) {
    console.warn("Notice: Disk write skipped for status update in read-only environment:", err);
  }

  return updated;
}

// ------------------- ENQUIRIES -------------------

export async function getAllEnquiriesAsync(): Promise<ContactEnquiry[]> {
  if (isDbConfigured()) {
    const dbEnq = await dbGetAllEnquiries();
    if (dbEnq !== null) return dbEnq;
  }
  return getAllEnquiries();
}

export function getAllEnquiries(): ContactEnquiry[] {
  const filePath = getFilePath("enquiries.json");
  seedFromProjectIfAvailable(filePath, "enquiries.json");

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw) as ContactEnquiry[];
      memoryEnquiries = parsed;
      return parsed;
    }
    const primaryFile = path.join(PRIMARY_DATA_DIR, "enquiries.json");
    if (fs.existsSync(primaryFile)) {
      const raw = fs.readFileSync(primaryFile, "utf8");
      const parsed = JSON.parse(raw) as ContactEnquiry[];
      memoryEnquiries = parsed;
      return parsed;
    }
  } catch (err) {
    console.warn("Could not read enquiries file, using in-memory:", err);
  }

  return memoryEnquiries;
}

export async function saveEnquiryAsync(enquiry: ContactEnquiry): Promise<ContactEnquiry> {
  if (isDbConfigured()) {
    const saved = await dbSaveEnquiry(enquiry);
    if (saved) {
      memoryEnquiries.unshift(enquiry);
      return enquiry;
    }
  }
  return saveEnquiry(enquiry);
}

export function saveEnquiry(enquiry: ContactEnquiry): ContactEnquiry {
  memoryEnquiries.unshift(enquiry);

  try {
    const filePath = getFilePath("enquiries.json");
    fs.writeFileSync(filePath, JSON.stringify(memoryEnquiries, null, 2), "utf8");
  } catch (err) {
    console.warn("Notice: Disk write skipped on read-only serverless environment. Memory enquiry retained:", err);
  }

  return enquiry;
}
