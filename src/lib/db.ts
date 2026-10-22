import { Pool } from "pg";
import { Order, ContactEnquiry, PaymentStatus, AccessStatus, AccessKeysMap, DEFAULT_KEYS } from "./types";

let pool: Pool | null = null;
let isInitialized = false;

export function isDbConfigured(): boolean {
  return Boolean(
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL
  );
}

export function getPool(): Pool | null {
  if (!isDbConfigured()) return null;

  if (!pool) {
    const connectionString =
      process.env.POSTGRES_URL ||
      process.env.DATABASE_URL ||
      process.env.POSTGRES_PRISMA_URL;

    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }

  return pool;
}

export async function initDatabase(): Promise<void> {
  const p = getPool();
  if (!p || isInitialized) return;

  try {
    // 1. Create Orders table
    await p.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(100) PRIMARY KEY,
        order_number VARCHAR(100) UNIQUE NOT NULL,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        tradingview_username VARCHAR(100) NOT NULL,
        plan_id VARCHAR(50) NOT NULL,
        plan_name VARCHAR(100) NOT NULL,
        amount_inr INTEGER NOT NULL,
        duration_months INTEGER NOT NULL,
        access_key VARCHAR(100) NOT NULL,
        payment_status VARCHAR(50) NOT NULL,
        access_status VARCHAR(50) NOT NULL,
        provider_payment_id VARCHAR(255),
        fulfilment_notes TEXT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // 2. Create Enquiries table
    await p.query(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255),
        message TEXT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'NEW',
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // 3. Create Access Keys table
    await p.query(`
      CREATE TABLE IF NOT EXISTS plan_access_keys (
        id VARCHAR(50) PRIMARY KEY DEFAULT 'current',
        monthly VARCHAR(100) NOT NULL,
        quarterly VARCHAR(100) NOT NULL,
        half_yearly VARCHAR(100) NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    // Seed default keys if table is empty
    await p.query(`
      INSERT INTO plan_access_keys (id, monthly, quarterly, half_yearly)
      VALUES ('current', $1, $2, $3)
      ON CONFLICT (id) DO NOTHING;
    `, [DEFAULT_KEYS.monthly, DEFAULT_KEYS.quarterly, DEFAULT_KEYS["half-yearly"]]);

    isInitialized = true;
  } catch (err) {
    console.error("Error initializing PostgreSQL schema:", err);
  }
}

// ------------------- ORDERS -------------------

export async function dbGetAllOrders(): Promise<Order[] | null> {
  const p = getPool();
  if (!p) return null;

  try {
    await initDatabase();
    const res = await p.query(`SELECT * FROM orders ORDER BY created_at DESC;`);
    return res.rows.map((row) => ({
      id: row.id,
      orderNumber: row.order_number,
      customerName: row.customer_name,
      customerEmail: row.customer_email,
      customerPhone: row.customer_phone,
      tradingViewUsername: row.tradingview_username,
      planId: row.plan_id,
      planName: row.plan_name,
      amountINR: row.amount_inr,
      durationMonths: row.duration_months,
      accessKey: row.access_key,
      paymentStatus: row.payment_status as PaymentStatus,
      accessStatus: row.access_status as AccessStatus,
      providerPaymentId: row.provider_payment_id || undefined,
      fulfilmentNotes: row.fulfilment_notes || undefined,
      createdAt: new Date(row.created_at).toISOString(),
      updatedAt: new Date(row.updated_at).toISOString(),
    }));
  } catch (err) {
    console.error("Postgres error getting orders:", err);
    return null;
  }
}

export async function dbSaveOrder(order: Order): Promise<boolean> {
  const p = getPool();
  if (!p) return false;

  try {
    await initDatabase();
    await p.query(
      `
      INSERT INTO orders (
        id, order_number, customer_name, customer_email, customer_phone,
        tradingview_username, plan_id, plan_name, amount_inr, duration_months,
        access_key, payment_status, access_status, provider_payment_id,
        fulfilment_notes, created_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      ON CONFLICT (id) DO UPDATE SET
        payment_status = EXCLUDED.payment_status,
        access_status = EXCLUDED.access_status,
        provider_payment_id = EXCLUDED.provider_payment_id,
        fulfilment_notes = EXCLUDED.fulfilment_notes,
        updated_at = EXCLUDED.updated_at;
      `,
      [
        order.id,
        order.orderNumber,
        order.customerName,
        order.customerEmail,
        order.customerPhone,
        order.tradingViewUsername,
        order.planId,
        order.planName,
        order.amountINR,
        order.durationMonths,
        order.accessKey,
        order.paymentStatus,
        order.accessStatus,
        order.providerPaymentId || null,
        order.fulfilmentNotes || null,
        order.createdAt,
        order.updatedAt,
      ]
    );
    return true;
  } catch (err) {
    console.error("Postgres error saving order:", err);
    return false;
  }
}

export async function dbUpdateOrderStatus(
  id: string,
  updates: {
    paymentStatus?: PaymentStatus;
    accessStatus?: AccessStatus;
    providerPaymentId?: string;
    fulfilmentNotes?: string;
  }
): Promise<boolean> {
  const p = getPool();
  if (!p) return false;

  try {
    await initDatabase();
    const sets: string[] = ["updated_at = NOW()"];
    const vals: any[] = [];
    let idx = 1;

    if (updates.paymentStatus) {
      sets.push(`payment_status = $${idx++}`);
      vals.push(updates.paymentStatus);
    }
    if (updates.accessStatus) {
      sets.push(`access_status = $${idx++}`);
      vals.push(updates.accessStatus);
    }
    if (updates.providerPaymentId) {
      sets.push(`provider_payment_id = $${idx++}`);
      vals.push(updates.providerPaymentId);
    }
    if (updates.fulfilmentNotes) {
      sets.push(`fulfilment_notes = $${idx++}`);
      vals.push(updates.fulfilmentNotes);
    }

    vals.push(id);
    const query = `UPDATE orders SET ${sets.join(", ")} WHERE id = $${idx} OR order_number = $${idx};`;
    await p.query(query, vals);
    return true;
  } catch (err) {
    console.error("Postgres error updating order:", err);
    return false;
  }
}

// ------------------- ENQUIRIES -------------------

export async function dbGetAllEnquiries(): Promise<ContactEnquiry[] | null> {
  const p = getPool();
  if (!p) return null;

  try {
    await initDatabase();
    const res = await p.query(`SELECT * FROM enquiries ORDER BY created_at DESC;`);
    return res.rows.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      subject: row.subject || "",
      message: row.message,
      status: row.status,
      createdAt: new Date(row.created_at).toISOString(),
    }));
  } catch (err) {
    console.error("Postgres error getting enquiries:", err);
    return null;
  }
}

export async function dbSaveEnquiry(enquiry: ContactEnquiry): Promise<boolean> {
  const p = getPool();
  if (!p) return false;

  try {
    await initDatabase();
    await p.query(
      `INSERT INTO enquiries (id, name, email, subject, message, status, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [
        enquiry.id,
        enquiry.name,
        enquiry.email,
        enquiry.subject,
        enquiry.message,
        enquiry.status,
        enquiry.createdAt,
      ]
    );
    return true;
  } catch (err) {
    console.error("Postgres error saving enquiry:", err);
    return false;
  }
}

// ------------------- ACCESS KEYS -------------------

export async function dbGetAccessKeys(): Promise<AccessKeysMap | null> {
  const p = getPool();
  if (!p) return null;

  try {
    await initDatabase();
    const res = await p.query(`SELECT monthly, quarterly, half_yearly FROM plan_access_keys WHERE id = 'current' LIMIT 1;`);
    if (res.rows.length > 0) {
      return {
        monthly: res.rows[0].monthly,
        quarterly: res.rows[0].quarterly,
        "half-yearly": res.rows[0].half_yearly,
      };
    }
    return DEFAULT_KEYS;
  } catch (err) {
    console.error("Postgres error getting access keys:", err);
    return null;
  }
}

export async function dbSaveAccessKeys(keys: AccessKeysMap): Promise<boolean> {
  const p = getPool();
  if (!p) return false;

  try {
    await initDatabase();
    await p.query(
      `INSERT INTO plan_access_keys (id, monthly, quarterly, half_yearly, updated_at)
       VALUES ('current', $1, $2, $3, NOW())
       ON CONFLICT (id) DO UPDATE SET
         monthly = EXCLUDED.monthly,
         quarterly = EXCLUDED.quarterly,
         half_yearly = EXCLUDED.half_yearly,
         updated_at = NOW();`,
      [keys.monthly, keys.quarterly, keys["half-yearly"]]
    );
    return true;
  } catch (err) {
    console.error("Postgres error saving access keys:", err);
    return false;
  }
}
