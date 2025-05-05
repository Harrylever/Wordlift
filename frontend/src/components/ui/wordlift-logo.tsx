import { Edit3 } from "lucide-react"

export function WordLiftLogo({ isCollapsed }: { isCollapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Edit3 className="h-6 w-6 text-purple-600" />
      {isCollapsed ? null : (
        <span className="text-2xl font-bold">WordLift</span>
      )}
    </div>
  )
}
