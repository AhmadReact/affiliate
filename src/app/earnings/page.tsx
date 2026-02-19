import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import EarningsClaimCard from "@/components/earnings/EarningsClaimCard";
import EarningsTable from "@/components/earnings/EarningsTable";
import EarningsSidebar from "@/components/earnings/EarningsSidebar";

export const metadata = {
  title: "Earnings – KosherPhone Affiliate",
};

export default function EarningsPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Page title + top-right claim button */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
              <p className="text-sm text-gray-400 mt-0.5">
                Track your earnings and claim payouts.
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap">
              Claim Payment ($1,070.25)
            </button>
          </div>

          {/* Body: main content + right sidebar */}
          <div className="flex gap-5 mt-5 items-start">

            {/* Main column */}
            <div className="flex-1 flex flex-col gap-5 min-w-0">
              <EarningsClaimCard />
              <EarningsTable />
            </div>

            {/* Right sidebar */}
            <EarningsSidebar />
          </div>
        </main>
      </div>
    </div>
  );
}
