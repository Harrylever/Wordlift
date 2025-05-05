"use client"

import dynamic from "next/dynamic"
import { Button } from "./ui/button"
import { CheckCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type PricingPlanProps = {
  title: string
  description: string
  price: number
  features: string[]
  isPopular: boolean
  buttonVariant: string
  userPlan?: string
  planCode?: string
  userEmail?: string
  onPaymentSuccess: (data: {
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
  isPopular = false,
  buttonVariant = "outline",
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
    <Card
      className={`flex flex-col ${
        isPopular ? "border-purple-600 shadow-lg" : "border-purple-100"
      }`}
    >
      <CardHeader className={isPopular ? "bg-purple-50 rounded-t-lg" : ""}>
        {isPopular && (
          <div className="py-1 px-3 text-xs font-medium text-purple-800 bg-purple-100 rounded-full w-fit mx-auto mb-2">
            Most Popular
          </div>
        )}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className="mt-4 flex items-baseline text-4xl font-bold">
          {`₦${price.toLocaleString("en")}`}
          <span className="ml-1 text-sm font-medium text-muted-foreground">
            /month
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2 text-sm">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {clientReady && (
          <>
            {pathname === "/" ? (
              <Button
                variant={buttonVariant as "outline" | "default"}
                {...(isPopular
                  ? { className: "w-full bg-purple-600 hover:bg-purple-700" }
                  : { className: "w-full" })}
              >
                Get Started
              </Button>
            ) : (
              <PaystackButton
                className={cn(
                  "py-2 rounded-lg",
                  isPopular
                    ? "w-full bg-purple-600 hover:bg-purple-700 text-white"
                    : "w-full border"
                )}
                disabled={isVerifyingPayment || planIsActive}
                {...paystackButtonComponentProps}
              >
                {planIsActive ? "Plan is active" : "Get Started"}
              </PaystackButton>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  )
}
