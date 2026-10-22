export interface Plan {
  id: string;
  name: string;
  tagline: string;
  durationMonths: number;
  priceINR: number;
  monthlyEquivalent: number;
  savingsINR: number;
  features: string[];
  popular?: boolean;
}

export interface Indicator {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  version: string;
  description: string;
  fullDescription: string[];
  features: {
    title: string;
    description: string;
  }[];
  supportedMarkets: string[];
  supportedTimeframes: string[];
  installationSteps: string[];
  limitations: string[];
  tradingViewRequirements: string[];
  published: boolean;
}

export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "CANCELLED";
export type AccessStatus = "PENDING_INVITE" | "IN_PROGRESS" | "GRANTED" | "REVOKED";

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  tradingViewUsername: string;
  planId: string;
  planName: string;
  amountINR: number;
  durationMonths: number;
  accessKey: string;
  paymentStatus: PaymentStatus;
  accessStatus: AccessStatus;
  providerPaymentId?: string;
  fulfilmentNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "NEW" | "RESOLVED";
  createdAt: string;
}

export interface AccessKeysMap {
  monthly: string;
  quarterly: string;
  "half-yearly": string;
}

export const DEFAULT_KEYS: AccessKeysMap = {
  monthly: "1PTZ26RSK934",
  quarterly: "1PTZ26KSS589",
  "half-yearly": "1PTZ26TKS521",
};

