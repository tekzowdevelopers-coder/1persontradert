import fs from "fs";
import path from "path";
import { AccessKeysMap, DEFAULT_KEYS } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const KEYS_FILE = path.join(DATA_DIR, "keys.json");

export { DEFAULT_KEYS, type AccessKeysMap };

export function getAccessKeys(): AccessKeysMap {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(KEYS_FILE)) {
      fs.writeFileSync(KEYS_FILE, JSON.stringify(DEFAULT_KEYS, null, 2), "utf8");
      return DEFAULT_KEYS;
    }
    const raw = fs.readFileSync(KEYS_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return {
      monthly: parsed.monthly || DEFAULT_KEYS.monthly,
      quarterly: parsed.quarterly || DEFAULT_KEYS.quarterly,
      "half-yearly": parsed["half-yearly"] || DEFAULT_KEYS["half-yearly"],
    };
  } catch (err) {
    console.error("Error reading keys file:", err);
    return DEFAULT_KEYS;
  }
}

export function saveAccessKeys(newKeys: Partial<AccessKeysMap>): AccessKeysMap {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const current = getAccessKeys();
  const updated: AccessKeysMap = {
    monthly: (newKeys.monthly || current.monthly).trim(),
    quarterly: (newKeys.quarterly || current.quarterly).trim(),
    "half-yearly": (newKeys["half-yearly"] || current["half-yearly"]).trim(),
  };
  fs.writeFileSync(KEYS_FILE, JSON.stringify(updated, null, 2), "utf8");
  return updated;
}

export function validatePlanAccessKey(planId: string, enteredKey: string): { valid: boolean; message?: string } {
  const keys = getAccessKeys();
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
