"use client"

import { useState } from "react"
import Link from "next/link"
import { SquareRoundCorner } from "lucide-react"
import { motion } from "motion/react"
import { SidebarItem } from "./sidebar-item"
import { TitleSection } from "./title-section"
import { ToggleSideBar } from "./toggle-sidebar"
import { usePathname, useRouter } from "next/navigation"
import { WordLiftLogo } from "../ui/wordlift-logo"

export const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isBoardPath = pathname === "/board"

  const goToBoard = () => {
    router.push("/board")
  }

  return (
    <motion.nav
      layout
      className="sticky top-0 h-screen shrink-0 border-r border-slate-300 bg-white p-2"
      style={{
        width: isOpen ? "225px" : "fit-content",
      }}
    >
      <div className="mb-3 border-b border-zinc-300 py-3.5 px-3">
        <Link href="/">
          <WordLiftLogo isCollapsed={!isOpen} />
        </Link>
      </div>

      <div className="space-y-1">
        <SidebarItem
          Icon={SquareRoundCorner}
          title="Insights"
          selected={isBoardPath}
          setSelected={goToBoard}
          open={isOpen}
          notifs={0}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <TitleSection open={isOpen} />
        <ToggleSideBar open={isOpen} setOpen={setIsOpen} />
      </div>
    </motion.nav>
  )
}
