"use client"

import { useGetUserInfo } from "../(hooks)"
import { CreditsTab } from "./credits-tab"
import { CurrentPlanTab } from "./current-plan-tab"
import { PlansPricingSection } from "./plans-pricing-section"

export const TabsContainer = () => {
  const { data, isFetching } = useGetUserInfo()

  const [userInfo, userSubscription] = data || []

  const credit_balance = userInfo?.credit_balance || 0

  return (
    <div className="p-10 pt-0">
      <div className="mt-6 flex flex-col gap-6">
        <CurrentPlanTab
          plan={userSubscription}
          isLoading={isFetching}
        />
        <CreditsTab credits={credit_balance} isLoading={isFetching} />
      </div>

      <div className="mt-20 p-4">
        <div>
          <p className="font-sans">Change Plan</p>
          <p className="font-sans text-xs">Update your current plan</p>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <PlansPricingSection />
        </div>
      </div>
    </div>
  )
}
