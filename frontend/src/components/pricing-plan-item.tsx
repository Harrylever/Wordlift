"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "./ui/button"
import { CheckCircle2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type PricingPlanProps = {
  title: string
  description: string
  price: number
  features: { included: boolean; text: string }[]
  buttonText: string
  popular?: boolean
  userPlan?: string
  userEmail?: string
  planCode?: string
  onPaymentSuccess: ({
    reference,
    selectedPlanCode,
  }: {
    reference: string
    selectedPlanCode: string
  }) => void
  isVerifyingPayment?: boolean
}

const PaystackButton = dynamic(
  () =>
    import("react-paystack").then((mod) => {
      const { PaystackButton } = mod
      return PaystackButton
    }),
  { ssr: false }
)

const setConfig = ({
  userEmail,
  amount,
}: {
  userEmail: string
  amount: number
}) => {
  return {
    reference: new Date().getTime().toString(),
    email: userEmail,
    amount: amount * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  }
}

interface PaymentResponse {
  reference: string
}

export const PricingPlan = ({
  title,
  description,
  price,
  features,
  buttonText,
  popular = false,
  userPlan,
  userEmail,
  planCode,
  onPaymentSuccess,
  isVerifyingPayment,
}: PricingPlanProps) => {
  const pathname = usePathname()
  const [clientReady, setClientReady] = useState(false)

  useEffect(() => {
    setClientReady(true)
  }, [])

  const config = setConfig({
    userEmail: userEmail || "",
    amount: price,
  })

  const paystackButtonComponentProps = {
    ...config,
    onSuccess: (res: PaymentResponse) => {
      onPaymentSuccess({
        reference: res.reference,
        selectedPlanCode: planCode || "",
      })
    },
    onClose: () => {},
  }

  const planIsActive = userPlan === planCode

  return (
    <div
      className={`relative flex flex-col rounded-xl border ${
        popular ? "border-teal-200" : ""
      } bg-white p-6 ${popular ? "shadow-md" : "shadow-sm"}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-teal-600 px-4 py-1 text-xs font-semibold text-white">
          Most Popular
        </div>
      )}
      <div className="space-y-2">
        <h3 className="text-xl font-bold font-mono">{title}</h3>
        <p className="text-sm text-slate-600 font-mono">{description}</p>
      </div>
      <div className="mt-4 flex items-baseline">
        <span className="text-3xl font-bold">{`₦${price.toLocaleString(
          "en"
        )}`}</span>
        <span className="ml-1 text-sm text-slate-600">/month</span>
      </div>
      <ul className="mt-6 space-y-3">
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            included={feature.included}
            text={feature.text}
          />
        ))}
      </ul>
      <div className="mt-6 pt-6 border-t">
        {clientReady && (
          <>
            {pathname === "/" ? (
              <Button
                asChild
                className="w-full bg-teal-600 hover:bg-teal-700 font-mono"
              >
                <Link href="/">{buttonText}</Link>
              </Button>
            ) : (
              <PaystackButton
                disabled={planIsActive || isVerifyingPayment}
                className="w-full bg-teal-600 hover:bg-teal-700 font-mono text-white rounded-lg py-2"
                {...paystackButtonComponentProps}
              >
                {planIsActive ? "Plan is active" : "Get Started"}
              </PaystackButton>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const FeatureItem = ({
  included,
  text,
}: {
  included: boolean
  text: string
}) => {
  return (
    <li className={`flex items-start ${!included ? "text-slate-400" : ""}`}>
      <CheckCircle2
        className={`mr-2 h-5 w-5 ${
          included ? "text-teal-600" : "text-slate-300"
        } shrink-0 mt-0.5`}
      />
      <span>{text}</span>
    </li>
  )
}
