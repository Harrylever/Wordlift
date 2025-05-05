"use client"

import { getToken } from "@/utils/auth"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const accessToken = getToken("access_token")

    if (accessToken) {
      router.push(`/board`)
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-purple-600" />
        <p className="mt-2 text-lg">WordLift</p>
      </div>
    )
  }

  return <>{children}</>
}
