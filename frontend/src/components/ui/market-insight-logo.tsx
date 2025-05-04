export function MarketInsightLogo({ isCollapsed }: { isCollapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <BarChart3 className="h-6 w-6 text-teal-600" />
      {isCollapsed ? null : (
        <span className="text-xl font-bold">MarketInsight</span>
      )}
    </div>
  )
}

function BarChart3(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M7 16h4" />
      <path d="M7 12h4" />
      <path d="M7 8h4" />
      <path d="M15 16h4" />
      <path d="M15 12h4" />
      <path d="M15 8h4" />
    </svg>
  )
}
