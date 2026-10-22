"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  Search,
  KeyRound,
  CreditCard,
  MessageSquare,
  ExternalLink,
  LogOut,
  Save,
  Check,
  Copy,
} from "lucide-react";
import { Order, ContactEnquiry, AccessStatus, DEFAULT_KEYS, AccessKeysMap } from "@/lib/types";



const ADMIN_PIN_DEFAULT = "admin1person2026";

export default function AdminPage() {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [planKeys, setPlanKeys] = useState<AccessKeysMap>(DEFAULT_KEYS);
  const [activeTab, setActiveTab] = useState<"orders" | "keys" | "enquiries">("orders");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Key form management
  const [monthlyKeyInput, setMonthlyKeyInput] = useState(DEFAULT_KEYS.monthly);
  const [quarterlyKeyInput, setQuarterlyKeyInput] = useState(DEFAULT_KEYS.quarterly);
  const [biannualKeyInput, setBiannualKeyInput] = useState(DEFAULT_KEYS["half-yearly"]);
  const [savingKeys, setSavingKeys] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Check saved session
  useEffect(() => {
    const savedPin = sessionStorage.getItem("1p_admin_pin");
    if (savedPin === ADMIN_PIN_DEFAULT) {
      setIsAuthenticated(true);
      fetchAdminData(savedPin);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN_DEFAULT) {
      setIsAuthenticated(true);
      sessionStorage.setItem("1p_admin_pin", pin);
      setAuthError("");
      fetchAdminData(pin);
    } else {
      setAuthError("Invalid Admin PIN. Please verify your credentials.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("1p_admin_pin");
    setPin("");
  };

  const fetchAdminData = async (adminPin: string) => {
    setLoading(true);
    try {
      const [ordersRes, enquiriesRes, keysRes] = await Promise.all([
        fetch("/api/admin/orders", {
          headers: { "x-admin-pin": adminPin },
        }),
        fetch("/api/admin/enquiries", {
          headers: { "x-admin-pin": adminPin },
        }),
        fetch("/api/admin/keys", {
          headers: { "x-admin-pin": adminPin },
        }),
      ]);

      if (ordersRes.ok) {
        const oData = await ordersRes.json();
        setOrders(oData.orders || []);
      }
      if (enquiriesRes.ok) {
        const eData = await enquiriesRes.json();
        setEnquiries(eData.enquiries || []);
      }
      if (keysRes.ok) {
        const kData = await keysRes.json();
        if (kData.keys) {
          setPlanKeys(kData.keys);
          setMonthlyKeyInput(kData.keys.monthly);
          setQuarterlyKeyInput(kData.keys.quarterly);
          setBiannualKeyInput(kData.keys["half-yearly"]);
        }
      }
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateAccess = async (orderId: string, newStatus: AccessStatus) => {
    const savedPin = sessionStorage.getItem("1p_admin_pin") || ADMIN_PIN_DEFAULT;
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": savedPin,
        },
        body: JSON.stringify({
          orderId,
          accessStatus: newStatus,
          fulfilmentNotes: `Status updated to ${newStatus} by admin on ${new Date().toLocaleTimeString()}`,
        }),
      });

      if (res.ok) {
        setActionSuccess(`Order ${orderId} access status updated to ${newStatus}`);
        fetchAdminData(savedPin);
        setTimeout(() => setActionSuccess(null), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveKeys = async (e: React.FormEvent) => {
    e.preventDefault();
    const savedPin = sessionStorage.getItem("1p_admin_pin") || ADMIN_PIN_DEFAULT;
    setSavingKeys(true);

    try {
      const res = await fetch("/api/admin/keys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-pin": savedPin,
        },
        body: JSON.stringify({
          monthly: monthlyKeyInput.trim(),
          quarterly: quarterlyKeyInput.trim(),
          "half-yearly": biannualKeyInput.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setPlanKeys(data.keys);
        setActionSuccess("Plan Access Keys saved successfully! New keys are now strictly enforced on public checkout.");
        setTimeout(() => setActionSuccess(null), 5000);
      } else {
        alert(data.error || "Failed to update keys");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating access keys");
    } finally {
      setSavingKeys(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Metrics
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === "PAID")
    .reduce((sum, o) => sum + o.amountINR, 0);
  const pendingInvites = orders.filter((o) => o.accessStatus === "PENDING_INVITE");
  const grantedInvites = orders.filter((o) => o.accessStatus === "GRANTED");

  // Filtering orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.tradingViewUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.accessKey && o.accessKey.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "ALL" || o.accessStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-navy text-white flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-brand-navyDark border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-brand-green/20 border border-brand-green/40 flex items-center justify-center text-brand-green mx-auto mb-6">
            <Lock className="w-6 h-6" />
          </div>

          <h1 className="text-xl font-bold text-center mb-1">
            1PERSON TRADER Operations
          </h1>
          <p className="text-xs text-slate-400 text-center mb-6">
            Enter administrator passcode to access order management and TradingView plan keys.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {authError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Security PIN
              </label>
              <input
                type="password"
                required
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (e.g. admin1person2026)"
                className="w-full px-4 py-3 bg-brand-navy border border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              />
              <span className="text-[11px] text-slate-400 block mt-1">
                Default access PIN: <code className="text-brand-green">admin1person2026</code>
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white text-xs font-bold transition-all shadow-sm"
            >
              Authorize &amp; Access Dashboard
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Admin Top Navigation */}
      <header className="bg-brand-navy text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-black tracking-tight">
              1PERSON <span className="text-brand-green">TRADER</span>
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-navyDark text-slate-300 font-mono border border-slate-700">
              Admin Gateway v1.2
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Banner Alert if any action completed */}
        {actionSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccess}</span>
            </div>
            <button onClick={() => setActionSuccess(null)} className="text-emerald-600 hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Dashboard Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
            <div className="flex items-center justify-between text-slate-500 mb-2 text-xs font-semibold uppercase">
              <span>Total Volume (PAID)</span>
              <CreditCard className="w-4 h-4 text-brand-green" />
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono">
              ₹{totalRevenue.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Verified orders across all plans
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
            <div className="flex items-center justify-between text-slate-500 mb-2 text-xs font-semibold uppercase">
              <span>Pending Invites</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600 font-mono">
              {pendingInvites.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Needs TradingView authorization
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
            <div className="flex items-center justify-between text-slate-500 mb-2 text-xs font-semibold uppercase">
              <span>Active Licenses Granted</span>
              <CheckCircle2 className="w-4 h-4 text-brand-green" />
            </div>
            <div className="text-2xl font-black text-brand-navy font-mono">
              {grantedInvites.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Live on user TradingView charts
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-subtle">
            <div className="flex items-center justify-between text-slate-500 mb-2 text-xs font-semibold uppercase">
              <span>Plan Access Keys</span>
              <KeyRound className="w-4 h-4 text-brand-green" />
            </div>
            <div className="text-2xl font-black text-brand-green font-mono">
              3 Active
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Strict client checkout validation
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-6 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "orders"
                ? "border-brand-green text-brand-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Orders &amp; TradingView Fulfilment</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs">
              {orders.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("keys")}
            className={`pb-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "keys"
                ? "border-brand-green text-brand-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <KeyRound className="w-4 h-4 text-brand-green" />
            <span>Manage Plan Access Keys</span>
            <span className="px-2 py-0.5 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold">
              Config
            </span>
          </button>

          <button
            onClick={() => setActiveTab("enquiries")}
            className={`pb-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "enquiries"
                ? "border-brand-green text-brand-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Inquiries Desk</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-xs">
              {enquiries.length}
            </span>
          </button>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === "orders" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle overflow-hidden">
            {/* Table Control Bar */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name, TV user, key, order..."
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-none"
                >
                  <option value="ALL">All Access States</option>
                  <option value="PENDING_INVITE">Pending Invite</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="GRANTED">Access Granted</option>
                  <option value="REVOKED">Revoked</option>
                </select>

                <button
                  onClick={() => {
                    const savedPin = sessionStorage.getItem("1p_admin_pin") || ADMIN_PIN_DEFAULT;
                    fetchAdminData(savedPin);
                  }}
                  className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-600"
                  title="Refresh orders"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto">
              {filteredOrders.length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-400">
                  No orders match your current filter. New orders from checkout will appear here in real time.
                </div>
              ) : (
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Order Ref</th>
                      <th className="py-3.5 px-4">Customer Details</th>
                      <th className="py-3.5 px-4">TradingView ID</th>
                      <th className="py-3.5 px-4">Plan &amp; Amount</th>
                      <th className="py-3.5 px-4">Access Key</th>
                      <th className="py-3.5 px-4">Payment</th>
                      <th className="py-3.5 px-4">Access Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {filteredOrders.map((order) => {
                      return (
                        <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-slate-900">
                            {order.orderNumber}
                            <span className="block text-[10px] text-slate-400 font-normal">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <strong className="text-slate-900 block">{order.customerName}</strong>
                            <span className="text-[11px] text-slate-500 block">{order.customerEmail}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{order.customerPhone}</span>
                          </td>

                          <td className="py-4 px-4 font-mono font-bold text-brand-navy">
                            <span className="bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 inline-block text-brand-navy">
                              {order.tradingViewUsername}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span className="font-semibold block">{order.planName}</span>
                            <span className="text-slate-900 font-mono font-bold">
                              ₹{order.amountINR.toLocaleString()}
                            </span>
                          </td>

                          <td className="py-4 px-4 font-mono text-[11px]">
                            {order.accessKey ? (
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold">
                                {order.accessKey}
                              </span>
                            ) : (
                              <span className="text-slate-400">N/A</span>
                            )}
                          </td>

                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                order.paymentStatus === "PAID"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                order.accessStatus === "GRANTED"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : order.accessStatus === "IN_PROGRESS"
                                  ? "bg-sky-100 text-sky-800"
                                  : order.accessStatus === "REVOKED"
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {order.accessStatus.replace("_", " ")}
                            </span>
                          </td>

                          <td className="py-4 px-4 text-right space-x-1 whitespace-nowrap">
                            {order.accessStatus !== "GRANTED" && (
                              <button
                                onClick={() => updateAccess(order.id, "GRANTED")}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs"
                                title="Mark as Granted after adding to TradingView"
                              >
                                Grant Access
                              </button>
                            )}

                            {order.accessStatus === "GRANTED" && (
                              <button
                                onClick={() => updateAccess(order.id, "REVOKED")}
                                className="px-2 py-1 rounded-lg bg-slate-200 hover:bg-rose-100 text-slate-700 hover:text-rose-700 text-[11px] font-medium"
                                title="Revoke expired access"
                              >
                                Revoke
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MANAGE PLAN ACCESS KEYS */}
        {activeTab === "keys" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle p-6 sm:p-8 space-y-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green text-xs font-semibold uppercase tracking-wider mb-2">
                <KeyRound className="w-3.5 h-3.5" />
                <span>Plan Access Key Security</span>
              </div>
              <h2 className="text-xl font-black text-brand-navy">
                Configure Subscription Access Keys
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Customers must enter the corresponding access key at checkout. You can modify the keys below at any time. Updates persist immediately to disk and take effect instantly on client validation.
              </p>
            </div>

            <form onSubmit={handleSaveKeys} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1 Month Key */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy">1 Month Plan</h4>
                      <p className="text-[11px] text-slate-500 font-mono">Price: ₹4,000</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(monthlyKeyInput, "monthly")}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-brand-green"
                      title="Copy Key"
                    >
                      {copiedKey === "monthly" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                      Access Key Code
                    </label>
                    <input
                      type="text"
                      required
                      value={monthlyKeyInput}
                      onChange={(e) => setMonthlyKeyInput(e.target.value.toUpperCase())}
                      placeholder="e.g. 1PTZ26RSK934"
                      className="w-full px-3 py-2.5 font-mono text-xs uppercase bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green font-bold text-brand-navy"
                    />
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Default: <code>1PTZ26RSK934</code>
                  </div>
                </div>

                {/* 3 Months Key */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy">3 Months Plan</h4>
                      <p className="text-[11px] text-slate-500 font-mono">Price: ₹10,500</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(quarterlyKeyInput, "quarterly")}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-brand-green"
                      title="Copy Key"
                    >
                      {copiedKey === "quarterly" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                      Access Key Code
                    </label>
                    <input
                      type="text"
                      required
                      value={quarterlyKeyInput}
                      onChange={(e) => setQuarterlyKeyInput(e.target.value.toUpperCase())}
                      placeholder="e.g. 1PTZ26KSS589"
                      className="w-full px-3 py-2.5 font-mono text-xs uppercase bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green font-bold text-brand-navy"
                    />
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Default: <code>1PTZ26KSS589</code>
                  </div>
                </div>

                {/* 6 Months Key */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-brand-navy">6 Months Plan</h4>
                      <p className="text-[11px] text-slate-500 font-mono">Price: ₹18,000</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(biannualKeyInput, "biannual")}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-brand-green"
                      title="Copy Key"
                    >
                      {copiedKey === "biannual" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase mb-1">
                      Access Key Code
                    </label>
                    <input
                      type="text"
                      required
                      value={biannualKeyInput}
                      onChange={(e) => setBiannualKeyInput(e.target.value.toUpperCase())}
                      placeholder="e.g. 1PTZ26TKS521"
                      className="w-full px-3 py-2.5 font-mono text-xs uppercase bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green font-bold text-brand-navy"
                    />
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Default: <code>1PTZ26TKS521</code>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Keys are stored encrypted on server disk in <code>data/keys.json</code></span>
                </div>

                <button
                  type="submit"
                  disabled={savingKeys}
                  className="px-6 py-3 rounded-xl bg-brand-green hover:bg-brand-greenDark text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{savingKeys ? "Saving Changes..." : "Save & Update Access Keys"}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: CONTACT ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-subtle p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Customer Contact Enquiries
            </h3>
            {enquiries.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No contact inquiries logged yet.
              </p>
            ) : (
              <div className="space-y-4">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <strong className="text-sm text-slate-900">{enq.name}</strong>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {new Date(enq.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="text-slate-500 font-mono">
                      Email: <a href={`mailto:${enq.email}`} className="text-brand-green underline">{enq.email}</a> • Subject: <strong className="text-slate-800">{enq.subject}</strong>
                    </div>
                    <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80">
                      {enq.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
