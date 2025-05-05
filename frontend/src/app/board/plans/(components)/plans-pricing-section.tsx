"use client"

import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToastContext } from "@/components/toast"
import {
  useGetSubscriptionPlans,
  useGetUserSubscription,
  useVerifyPlanPaymentMutation,
} from "@/app/board/plans/(hooks)"
import { useQueryClient } from "@tanstack/react-query"
import { PricingPlan } from "@/components/pricing-plan-item"
import { pricing_plans } from "../data"
import { useGetUserProfile } from "../../(hooks)"

const professionalPricingPlan = pricing_plans.find(
  (plan) => plan.title === "Professional"
)
const enterprisePricingPlan = pricing_plans.find(
  (plan) => plan.title === "Enterprise"
)

export const PlansPricingSection = () => {
  const queryClient = useQueryClient()
  const { setNotification } = useToastContext()
  const {
    data: subscriptionPlans,
    isFetching,
    isError,
    refetch,
  } = useGetSubscriptionPlans()
  const { data: userSubscription, isFetching: isFetchingSubscription } =
    useGetUserSubscription()

  const { data: userProfile, isFetching: isFetchingUserProfile } =
    useGetUserProfile()

  const { mutateAsync: verifyPayment, isPending: isVerifying } =
    useVerifyPlanPaymentMutation()

  useEffect(() => {
    if (isError) {
      setNotification({
        message: "Error fetching plans",
        type: "error",
      })
    }
  }, [isError, setNotification])

  const loading = isFetching || isFetchingSubscription || isFetchingUserProfile

  if (loading) {
    return (
      <div className="mx-auto flex h-[200px] min-w-[200px] w-full items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  }

  if (!subscriptionPlans) {
    return (
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col w-fit items-center gap-2">
        <p className="font-sans">Could not fetch plans</p>
        <Button className="w-fit font-sans" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    )
  }

  const subscriptionPlansList = subscriptionPlans.data as {
    name: string
    plan_code: string
  }[]
  const professionalPlan = subscriptionPlansList.find(
    (plan) => plan.name === "professional"
  )
  const enterprisePlan = subscriptionPlansList.find(
    (plan) => plan.name === "enterprise"
  )

  const handleOnSuccess = async ({
    reference,
    selectedPlanCode,
  }: {
    reference: string
    selectedPlanCode: string
  }) => {
    try {
      await verifyPayment({
        plan_code: selectedPlanCode,
        reference: reference,
      })
      await queryClient.invalidateQueries({
        queryKey: ["get-user-info"],
      })
      await queryClient.invalidateQueries({
        queryKey: ["get-user-subscription"],
      })
      await queryClient.invalidateQueries({
        queryKey: ["user-credits"],
      })
    } catch (error) {
      //
      console.error(error, null, 2)
    }
  }

  const userEmail = userProfile?.email

  return (
    <div className="mx-auto max-w-6xl px-2 py-4 md:px-4">
      <div className="mx-auto mt-16 grid max-w-5xl gap-6 lg:grid-cols-2">
        <PricingPlan
          title={professionalPricingPlan?.title || ""}
          description={professionalPricingPlan?.description || ""}
          price={professionalPricingPlan?.price || 0}
          features={professionalPricingPlan?.features || []}
          isPopular
          userPlan={userSubscription?.plan_code}
          userEmail={userEmail}
          planCode={professionalPlan?.plan_code}
          onPaymentSuccess={handleOnSuccess}
          isVerifyingPayment={isVerifying}
          buttonVariant="default"
        />
        <PricingPlan
          title={enterprisePricingPlan?.title || ""}
          description={enterprisePricingPlan?.description || ""}
          price={enterprisePricingPlan?.price || 0}
          features={enterprisePricingPlan?.features || []}
          isPopular={false}
          userPlan={userSubscription?.plan_code}
          userEmail={userEmail}
          planCode={enterprisePlan?.plan_code}
          onPaymentSuccess={handleOnSuccess}
          isVerifyingPayment={isVerifying}
          buttonVariant="outline"
        />
      </div>
    </div>
  )
}
