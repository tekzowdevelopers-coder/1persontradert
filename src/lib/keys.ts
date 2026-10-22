import fs from "fs";
import path from "path";
import os from "os";
import { AccessKeysMap, DEFAULT_KEYS } from "./types";
import { isDbConfigured, dbGetAccessKeys, dbSaveAccessKeys } from "./db";

export { DEFAULT_KEYS, type AccessKeysMap };

let memoryKeys: AccessKeysMap = { ...DEFAULT_KEYS };

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
    return TMP_DATA_DIR;
  }
}

function getKeysFilePath(): string {
  return path.join(getStorageDir(), "keys.json");
}

export async function getAccessKeysAsync(): Promise<AccessKeysMap> {
  if (isDbConfigured()) {
    const dbKeys = await dbGetAccessKeys();
    if (dbKeys) {
      memoryKeys = dbKeys;
      return dbKeys;
    }
  }
  return getAccessKeys();
}

export function getAccessKeys(): AccessKeysMap {
  const filePath = getKeysFilePath();

  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const parsed = JSON.parse(raw);
      memoryKeys = {
        monthly: parsed.monthly || DEFAULT_KEYS.monthly,
        quarterly: parsed.quarterly || DEFAULT_KEYS.quarterly,
        "half-yearly": parsed["half-yearly"] || DEFAULT_KEYS["half-yearly"],
      };
      return memoryKeys;
    }

    // Check project data directory
    const primaryFile = path.join(PRIMARY_DATA_DIR, "keys.json");
    if (fs.existsSync(primaryFile)) {
      const raw = fs.readFileSync(primaryFile, "utf8");
      const parsed = JSON.parse(raw);
      memoryKeys = {
        monthly: parsed.monthly || DEFAULT_KEYS.monthly,
        quarterly: parsed.quarterly || DEFAULT_KEYS.quarterly,
        "half-yearly": parsed["half-yearly"] || DEFAULT_KEYS["half-yearly"],
      };
      return memoryKeys;
    }
  } catch (err) {
    console.warn("Could not read keys from disk, using fallback:", err);
  }

  return memoryKeys;
}

export async function saveAccessKeysAsync(newKeys: Partial<AccessKeysMap>): Promise<AccessKeysMap> {
  const current = await getAccessKeysAsync();
  const updated: AccessKeysMap = {
    monthly: (newKeys.monthly || current.monthly).trim(),
    quarterly: (newKeys.quarterly || current.quarterly).trim(),
    "half-yearly": (newKeys["half-yearly"] || current["half-yearly"]).trim(),
  };

  if (isDbConfigured()) {
    await dbSaveAccessKeys(updated);
  }

  return saveAccessKeys(updated);
}

export function saveAccessKeys(newKeys: Partial<AccessKeysMap>): AccessKeysMap {
  const current = getAccessKeys();
  const updated: AccessKeysMap = {
    monthly: (newKeys.monthly || current.monthly).trim(),
    quarterly: (newKeys.quarterly || current.quarterly).trim(),
    "half-yearly": (newKeys["half-yearly"] || current["half-yearly"]).trim(),
  };

  memoryKeys = updated;

  try {
    const filePath = getKeysFilePath();
    fs.writeFileSync(filePath, JSON.stringify(updated, null, 2), "utf8");
  } catch (err) {
    console.warn("Notice: Disk write skipped on read-only serverless environment:", err);
  }

  return updated;
}

export async function validatePlanAccessKeyAsync(
  planId: string,
  enteredKey: string
): Promise<{ valid: boolean; message?: string }> {
  const keys = await getAccessKeysAsync();
  return checkKeyAgainstMap(planId, enteredKey, keys);
}

export function validatePlanAccessKey(
  planId: string,
  enteredKey: string
): { valid: boolean; message?: string } {
  const keys = getAccessKeys();
  return checkKeyAgainstMap(planId, enteredKey, keys);
}

function checkKeyAgainstMap(
  planId: string,
  enteredKey: string,
  keys: AccessKeysMap
): { valid: boolean; message?: string } {
  const cleanEntered = (enteredKey || "").trim();

  let expectedKey = "";
  if (planId === "monthly") expectedKey = keys.monthly;
  else if (planId === "quarterly") expectedKey = keys.quarterly;
  else if (planId === "half-yearly") expectedKey = keys["half-yearly"];

  if (!expectedKey) {
    return { valid: false, message: "Invalid plan selected." };
  }

  if (cleanEntered !== expectedKey) {
    return {
      valid: false,
      message: "Invalid Access Key for this plan. Please contact administrator to obtain your authorized access key.",
    };
  }

  return { valid: true };
}
