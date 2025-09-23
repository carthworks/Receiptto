import React, { useMemo, useState } from "react";

// Example shadcn/ui imports (optional) — replace with your project's components if needed
// import { Card } from "@/components/ui/card";

export type Invoice = {
  id: string;
  number: string;
  client: string;
  date: string; // ISO
  dueDate: string; // ISO
  amount: number;
  currency: string;
  status: "draft" | "sent" | "overdue" | "paid";
  notes?: string;
};

// Mock data (replace with API data)
const MOCK_INVOICES: Invoice[] = [
  {
    id: "1",
    number: "INV-2025-001",
    client: "Asha Designs",
    date: "2025-08-01",
    dueDate: "2025-08-15",
    amount: 12500,
    currency: "INR",
    status: "paid",
    notes: "Website design deposit",
  },
  {
    id: "2",
    number: "INV-2025-002",
    client: "Greenfield Logistics",
    date: "2025-08-05",
    dueDate: "2025-08-20",
    amount: 42000,
    currency: "INR",
    status: "sent",
    notes: "Shipment handling & logistics",
  },
  {
    id: "3",
    number: "INV-2025-003",
    client: "Studio Nine",
    date: "2025-08-10",
    dueDate: "2025-08-17",
    amount: 5000,
    currency: "INR",
    status: "overdue",
    notes: "Photography retainer",
  },
  {
    id: "4",
    number: "INV-2025-004",
    client: "BlueBay Cafe",
    date: "2025-09-01",
    dueDate: "2025-09-15",
    amount: 2100,
    currency: "INR",
    status: "draft",
    notes: "POS printer receipt sample",
  },
];

function StatusBadge({ status }: { status: Invoice['status'] }) {
  const map = {
    draft: "bg-gray-100 text-gray-800",
    sent: "bg-blue-100 text-blue-800",
    overdue: "bg-red-100 text-red-800",
    paid: "bg-green-100 text-green-800",
  } as Record<Invoice['status'], string>;

  const label = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${map[status]}`}>
      {label}
    </span>
  );
}

export default function DashboardInvoices() {
  const [invoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Invoice['status']>("all");
  const [selected, setSelected] = useState<Invoice | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return invoices.filter((inv) => {
      if (statusFilter !== "all" && inv.status !== statusFilter) return false;
      if (!q) return true;
      return (
        inv.number.toLowerCase().includes(q) ||
        inv.client.toLowerCase().includes(q) ||
        String(inv.amount).includes(q)
      );
    });
  }, [invoices, query, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  function gotoPage(p: number) {
    setPage(Math.max(1, Math.min(totalPages, p)));
  }

  function formatCurrency(amount: number, currency = "INR") {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Invoices</h2>
          <p className="text-sm text-gray-500">Overview of recent invoices and payment status.</p>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search by invoice, client or amount"
            className="px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          />

          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value as any); setPage(1); }}
            className="px-3 py-2 border rounded-md text-sm"
          >
            <option value="all">All</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="overdue">Overdue</option>
            <option value="paid">Paid</option>
          </select>

          <button
            className="px-3 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700"
            onClick={() => { setQuery(""); setStatusFilter("all"); setPage(1); }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-md">
          <div className="text-xs text-gray-500">Total invoices</div>
          <div className="text-lg font-semibold text-gray-900">{invoices.length}</div>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-xs text-gray-500">Outstanding</div>
          <div className="text-lg font-semibold text-gray-900">{formatCurrency(invoices.filter(i => i.status !== 'paid').reduce((s, a) => s + a.amount, 0))}</div>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-xs text-gray-500">Paid</div>
          <div className="text-lg font-semibold text-gray-900">{formatCurrency(invoices.filter(i => i.status === 'paid').reduce((s, a) => s + a.amount, 0))}</div>
        </div>
        <div className="p-4 border rounded-md">
          <div className="text-xs text-gray-500">Overdue</div>
          <div className="text-lg font-semibold text-gray-900">{invoices.filter(i => i.status === 'overdue').length}</div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left">
              <th className="pb-3 text-xs text-gray-500">Invoice</th>
              <th className="pb-3 text-xs text-gray-500">Client</th>
              <th className="pb-3 text-xs text-gray-500">Date</th>
              <th className="pb-3 text-xs text-gray-500">Due</th>
              <th className="pb-3 text-xs text-gray-500">Amount</th>
              <th className="pb-3 text-xs text-gray-500">Status</th>
              <th className="pb-3 text-xs text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((inv) => (
              <tr key={inv.id} className="border-t">
                <td className="py-3 pr-4">
                  <div className="font-medium text-gray-800">{inv.number}</div>
                  <div className="text-xs text-gray-500">#{inv.id}</div>
                </td>
                <td className="py-3">{inv.client}</td>
                <td className="py-3">{new Date(inv.date).toLocaleDateString()}</td>
                <td className="py-3">{new Date(inv.dueDate).toLocaleDateString()}</td>
                <td className="py-3">{formatCurrency(inv.amount, inv.currency)}</td>
                <td className="py-3"><StatusBadge status={inv.status} /></td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-xs border rounded text-indigo-600"
                      onClick={() => setSelected(inv)}
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 text-xs border rounded text-green-600"
                      onClick={() => alert(`Download PDF for ${inv.number}`)}
                    >
                      PDF
                    </button>
                    <button
                      className="px-3 py-1 text-xs border rounded text-red-600"
                      onClick={() => alert(`Send reminder for ${inv.number}`)}
                    >
                      Remind
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing { (page-1)*pageSize + 1 } - { Math.min(page*pageSize, filtered.length) } of {filtered.length}</div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border rounded" onClick={() => gotoPage(page-1)} disabled={page===1}>Prev</button>
          <div className="px-3 py-1 border rounded">{page} / {totalPages}</div>
          <button className="px-3 py-1 border rounded" onClick={() => gotoPage(page+1)} disabled={page===totalPages}>Next</button>
        </div>
      </div>

      {/* Drawer / Detail */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Invoice {selected.number}</h3>
              <button className="text-sm text-gray-600" onClick={() => setSelected(null)}>Close</button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs text-gray-500">Client</div>
                  <div className="font-medium text-gray-800">{selected.client}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Amount</div>
                  <div className="font-medium text-gray-800">{formatCurrency(selected.amount, selected.currency)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Date</div>
                  <div>{new Date(selected.date).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Due Date</div>
                  <div>{new Date(selected.dueDate).toLocaleDateString()}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-xs text-gray-500">Notes</div>
                  <div className="text-sm text-gray-700">{selected.notes}</div>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={() => alert('Mark as paid - demo')}>Mark paid</button>
                <button className="px-3 py-2 border rounded" onClick={() => alert('Send reminder - demo')}>Send reminder</button>
                <button className="px-3 py-2 border rounded" onClick={() => alert('Download PDF - demo')}>Download</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
