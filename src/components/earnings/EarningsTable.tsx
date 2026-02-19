"use client";
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ArrowUpDown, MoreHorizontal } from "lucide-react";

type EarningStatus = "Paid" | "Claimable" | "Pending" | "Claimable in 12 days";

interface Earning {
  id: number;
  date: string;
  description: string;
  descSub: string | null;
  descAmount: string | null;
  type: string;
  customer: string;
  customerSub: string | null;
  status: EarningStatus | string;
  amount: string;
  running: string;
  amountColor: string;
}

const earnings: Earning[] = [
  {
    id: 1,
    date: "Mar 1, 2024",
    description: "Payout",
    descSub: null,
    descAmount: null,
    type: "Bank Account",
    customer: "Bank Account",
    customerSub: null,
    status: "Paid",
    amount: "-$491.50",
    running: "$568.25",
    amountColor: "text-red-500",
  },
  {
    id: 2,
    date: "Feb 1, 2024",
    description: "Payout",
    descSub: null,
    descAmount: null,
    type: "Bank Account",
    customer: "Bank Account",
    customerSub: null,
    status: "Paid",
    amount: "-$491.50",
    running: "$1,059.75",
    amountColor: "text-red-500",
  },
  {
    id: 3,
    date: "Feb 1, 2024",
    description: "Payout",
    descSub: null,
    descAmount: null,
    type: "Payout",
    customer: "Gerriable",
    customerSub: "Fremam, Plan, |Fliami, FL",
    status: "Claimable",
    amount: "$31.00",
    running: "$1,059.75",
    amountColor: "text-gray-800",
  },
  {
    id: 4,
    date: "Feb 1, 2024",
    description: "Mehy 2",
    descSub: "Sub Affiliates, Plan",
    descAmount: "$4,341.20",
    type: "Sub",
    customer: "Aharon Klein",
    customerSub: "Basic alPonsey, NY",
    status: "Claimable",
    amount: "$33.00",
    running: "$1,096.25",
    amountColor: "text-gray-800",
  },
  {
    id: 5,
    date: "Feb 1, 2024",
    description: "Pending",
    descSub: "Payout, Affiliates, Plan",
    descAmount: "$1,394.31",
    type: "Payout",
    customer: "Levi Klein",
    customerSub: "Sub affiliatennarmedit, J#",
    status: "Pending",
    amount: "$32.50",
    running: "$1,378.25",
    amountColor: "text-gray-800",
  },
  {
    id: 6,
    date: "Feb 1, 2024",
    description: "Pending",
    descSub: "Payout, Affiliates, Plan",
    descAmount: "$1,301.30",
    type: "Payout",
    customer: "David Sternberg",
    customerSub: "Planmam, FL",
    status: "Paid",
    amount: "$34.00",
    running: "$1,278.50",
    amountColor: "text-gray-800",
  },
  {
    id: 7,
    date: "Feb 1, 2024",
    description: "Paid",
    descSub: "Sub, Affiliates, Plan",
    descAmount: "$1,394.25",
    type: "Sub",
    customer: "Sara Berg",
    customerSub: "Planmam, Onimmtt, NJ",
    status: "Claimable",
    amount: "$2.50",
    running: "$1,561.75",
    amountColor: "text-gray-800",
  },
  {
    id: 8,
    date: "Feb 1, 2024",
    description: "Paid",
    descSub: "Basic, Brooklyn, NY",
    descAmount: "$1,501.75",
    type: "Basic",
    customer: "J. Cohen",
    customerSub: "Brooklyn, NY",
    status: "Claimable in 12 days",
    amount: "$2.50",
    running: "$1,561.75",
    amountColor: "text-gray-800",
  },
];

const statusConfig: Record<string, string> = {
  Paid: "bg-blue-600 text-white",
  Claimable: "bg-teal-400 text-white",
  Pending: "bg-orange-300 text-white",
  "Claimable in 12 days": "bg-blue-100 text-blue-700 border border-blue-200",
};

interface ColumnDef {
  label: string;
  sortable: boolean;
}

const columns: ColumnDef[] = [
  { label: "DATE", sortable: false },
  { label: "DESCRIPTION", sortable: false },
  { label: "CUSTOMER / AFFILIATE", sortable: true },
  { label: "STATUS", sortable: false },
  { label: "AMOUNT", sortable: false },
  { label: "RUNNING", sortable: false },
];

export default function EarningsTable() {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Claimable", "Pending", "Paid"];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 px-4 sm:px-5 py-3 border-b border-gray-100">
        <div className="flex flex-wrap gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
          <button className="text-gray-400 hover:text-gray-600 px-2">
            <MoreHorizontal size={15} />
          </button>
        </div>

        <div className="sm:ml-auto flex items-center gap-1.5 text-xs text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 cursor-pointer">
          Feb 1, 2024 – Feb 19, 2024
          <ChevronDown size={12} />
        </div>
      </div>

      {/* Section title */}
      <div className="px-5 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-700">Earnings Breakdown</h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {columns.map(({ label, sortable }) => (
                <th
                  key={label}
                  className="text-left px-4 py-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap"
                >
                  <span className="flex items-center gap-1">
                    {label}
                    {sortable && (
                      <ArrowUpDown size={10} className="text-gray-300" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {earnings.map((row, i) => (
              <tr
                key={row.id}
                className={`border-b border-gray-50 hover:bg-blue-50/30 transition-colors ${
                  i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                }`}
              >
                {/* Date */}
                <td className="px-4 py-3 text-gray-600 whitespace-nowrap font-medium">
                  {row.date}
                </td>

                {/* Description */}
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-700">{row.description}</p>
                  {row.descAmount && (
                    <p className="text-[10px] text-gray-400 mt-0.5">{row.descAmount}</p>
                  )}
                  {row.descSub && (
                    <p className="text-[10px] text-gray-400">{row.descSub}</p>
                  )}
                </td>

                {/* Customer / Affiliate */}
                <td className="px-4 py-3">
                  <p className="font-semibold text-gray-700 whitespace-nowrap">
                    {row.customer}
                  </p>
                  {row.customerSub && (
                    <p className="text-[10px] text-gray-400 mt-0.5">{row.customerSub}</p>
                  )}
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                      statusConfig[row.status] ?? "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>

                {/* Amount */}
                <td className={`px-4 py-3 font-bold whitespace-nowrap ${row.amountColor}`}>
                  {row.amount}
                </td>

                {/* Running */}
                <td className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                  {row.running}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 sm:px-5 py-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">Showing 1–8 of 42 transactions</p>
        <div className="flex items-center gap-1">
          <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
            <ChevronLeft size={13} />
          </button>
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              className={`w-7 h-7 flex items-center justify-center rounded text-xs font-medium transition-colors ${
                p === 1
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
