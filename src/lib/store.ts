import fs from "fs";
import path from "path";
import { Order, ContactEnquiry, PaymentStatus, AccessStatus } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

// Ensure data directory and files exist
function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2), "utf8");
  }
  if (!fs.existsSync(ENQUIRIES_FILE)) {
    fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify([], null, 2), "utf8");
  }
}

export function getAllOrders(): Order[] {
  ensureFiles();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, "utf8");
    return JSON.parse(raw) as Order[];
  } catch (err) {
    console.error("Error reading orders file:", err);
    return [];
  }
}

export function getOrderById(id: string): Order | undefined {
  const orders = getAllOrders();
  return orders.find((o) => o.id === id || o.orderNumber === id);
}

export function saveOrder(order: Order): Order {
  ensureFiles();
  const orders = getAllOrders();
  const existingIdx = orders.findIndex((o) => o.id === order.id);
  if (existingIdx >= 0) {
    orders[existingIdx] = order;
  } else {
    orders.unshift(order);
  }
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
  return order;
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
  if (idx === -1) return null;

  const current = orders[idx];
  const updated: Order = {
    ...current,
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  orders[idx] = updated;
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
  return updated;
}

export function getAllEnquiries(): ContactEnquiry[] {
  ensureFiles();
  try {
    const raw = fs.readFileSync(ENQUIRIES_FILE, "utf8");
    return JSON.parse(raw) as ContactEnquiry[];
  } catch (err) {
    console.error("Error reading enquiries file:", err);
    return [];
  }
}

export function saveEnquiry(enquiry: ContactEnquiry): ContactEnquiry {
  ensureFiles();
  const list = getAllEnquiries();
  list.unshift(enquiry);
  fs.writeFileSync(ENQUIRIES_FILE, JSON.stringify(list, null, 2), "utf8");
  return enquiry;
}
