import { ChevronRight } from "lucide-react";

interface SideCardProps {
  children: React.ReactNode;
  className?: string;
}

function SideCard({ children, className = "" }: SideCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-gray-100 shadow-sm p-4 ${className}`}>
      {children}
    </div>
  );
}

export default function EarningsSidebar() {
  return (
    <div className="flex flex-col gap-4 w-64 shrink-0">

      {/* Available to Claim + Claim button */}
      <SideCard>
        <p className="text-xs text-gray-500 font-medium mb-1">Available to Claim</p>
        <p className="text-3xl font-bold text-gray-800">$568.25</p>
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
          Claim Payment
          <ChevronRight size={15} />
        </button>
      </SideCard>

      {/* On Hold */}
      <SideCard>
        <p className="text-xs text-gray-500 font-medium mb-1">On Hold</p>
        <p className="text-3xl font-bold text-gray-800">$501.00</p>
        <p className="text-[10px] text-gray-400 mt-2 leading-relaxed">
          Becomes claimable between{" "}
          <span className="font-semibold text-gray-600">Feb → Mar 4</span>
        </p>
      </SideCard>

      {/* Lifetime Earned */}
      <SideCard>
        <p className="text-xs text-gray-500 font-medium mb-1">Lifetime Earned</p>
        <p className="text-3xl font-bold text-gray-800">$9,257.75</p>
      </SideCard>

      {/* Available to Claim with progress bar */}
      <SideCard>
        <p className="text-xs text-gray-500 font-medium mb-1">Available to Claim</p>
        <p className="text-3xl font-bold text-gray-800">$568.25</p>
        <div className="mt-3">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-teal-400 h-2 rounded-full"
              style={{ width: "97%" }}
            />
          </div>
          <p className="text-[10px] text-gray-400 text-right mt-1">$588.25</p>
        </div>
      </SideCard>

      {/* Lifetime Earned (bottom) */}
      <SideCard>
        <p className="text-xs text-gray-500 font-medium mb-1">Lifetime Earned</p>
        <p className="text-3xl font-bold text-gray-800">$9,257.75</p>
      </SideCard>

    </div>
  );
}
