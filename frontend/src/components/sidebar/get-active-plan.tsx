"use client"

import { useGetUserInfo } from "@/app/board/plans/(hooks)"
import { wordlift_plans } from "@/app/board/plans/data"
import { Loader2 } from "lucide-react"

export const GetSidebarUserInfo = () => {
  const { data, isLoading, isError } = useGetUserInfo()

  if (isLoading)
    return (
      <div className="flex items-center">
        <span className="block text-xs text-slate-500">Plan is loading</span>
        <Loader2 size={12} className="ml-1.5 animate-spin" />
      </div>
    )

  if (isError) {
    return (
      <div className="h-4 w-24 animate-pulse rounded-md bg-slate-200">
        <span className="text-xs text-red-500">Error loading user info</span>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="h-4 w-24 animate-pulse rounded-md bg-slate-200">
        <span className="text-xs text-red-500">No data available</span>
      </div>
    )
  }

  const [userInfo, userSubscription] = data
  const firstName = userInfo?.first_name

  const userHasSubscription = !!userSubscription

  if (!userHasSubscription) {
    return (
      <>
        <ReturnUserName firstName={firstName} />
        <span className="block text-xs text-slate-500">Free Plan</span>
      </>
    )
  }

  const wordliftPlan = wordlift_plans.find(
    (plan) => plan.plan_code === userSubscription.plan_code
  )

  if (!wordliftPlan) {
    return (
      <>
        <ReturnUserName firstName={firstName} />
        <span className="block text-xs text-slate-500">Free Plan</span>
      </>
    )
  }

  return (
    <>
      <ReturnUserName firstName={firstName} />
      <span className="block text-xs text-slate-500">{`${wordliftPlan.name} Plan`}</span>
    </>
  )
}

const ReturnUserName = ({ firstName }: { firstName: string }) => {
  return (
    <h6 className="block text-sm font-semibold capitalize">{`${firstName}'s Project`}</h6>
  )
}
