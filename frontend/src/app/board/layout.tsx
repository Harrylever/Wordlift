"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { getToken } from "@/utils/auth"
import { Sidebar } from "@/components/sidebar"
import { usePathname, useRouter } from "next/navigation"

export default function BoardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const accessToken = getToken("access_token")

    if (!accessToken) {
      router.push(`/login?from=${encodeURIComponent(pathname)}`)
    } else {
      setIsLoading(false)
    }
  }, [router, pathname])

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-purple-600" />
        <p className="mt-2 text-lg">WordLift</p>
      </div>
    )
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  )
}
