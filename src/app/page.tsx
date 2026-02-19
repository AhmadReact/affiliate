import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import StatsCards from "@/components/StatsCards";
import EarningsBreakdown from "@/components/EarningsBreakdown";
import ThisMonthEarnings from "@/components/ThisMonthEarnings";
import SubAffiliateNetwork from "@/components/SubAffiliateNetwork";
import MySubAffiliates from "@/components/MySubAffiliates";
import ReferralList from "@/components/ReferralList";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <Header />

        {/* Scrollable content area */}
        <main className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Welcome */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, Daniel!
            </h1>
            <p className="text-sm text-gray-400 mt-0.5">
              Track your referrals, earnings, and payouts.
            </p>
          </div>

          {/* Stats cards grid */}
          <StatsCards />

          {/* Bottom section: two-column layout */}
          <div className="grid grid-cols-12 gap-5 items-start">
            {/* Left column: Earnings row + Referral List stacked */}
            <div className="col-span-8 flex flex-col gap-5">
              {/* Earnings row */}
              <div className="grid grid-cols-8 gap-5">
                <div className="col-span-5">
                  <EarningsBreakdown />
                </div>
                <div className="col-span-3">
                  <ThisMonthEarnings />
                </div>
              </div>

              {/* Referral list sits directly below earnings */}
              <ReferralList />
            </div>

            {/* Right column: Sub Affiliate Network + My Sub Affiliates */}
            <div className="col-span-4 flex flex-col gap-5">
              <SubAffiliateNetwork />
              <MySubAffiliates />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
