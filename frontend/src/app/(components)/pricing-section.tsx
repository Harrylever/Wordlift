"use client"

import { PricingPlan } from "@/components/pricing-plan-item"
import { pricing_plans } from "../board/plans/data"

// Section Header Component
const PricingSectionHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
          Pricing
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Choose Your Plan
        </h2>
        <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Simple, transparent pricing that grows with your needs
        </p>
      </div>
    </div>
  )
}

// Contact Footer Component
const ContactFooter = () => {
  return (
    <div className="mx-auto max-w-3xl text-center mt-10">
      <p className="text-muted-foreground">
        All plans include a 14-day free trial. No credit card required. Cancel
        anytime.
      </p>
    </div>
  )
}

// Main Pricing Section Component
export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="w-full py-12 md:py-24 lg:py-32 bg-slate-50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <PricingSectionHeader />

        <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricing_plans.map((plan, index) => (
            <PricingPlan
              key={index}
              title={plan.title}
              description={plan.description}
              price={plan.price}
              features={plan.features}
              isPopular={plan.isPopular}
              buttonVariant={plan.buttonVariant}
              onPaymentSuccess={() => {}}
            />
          ))}
        </div>

        <ContactFooter />
      </div>
    </section>
  )
}
