"use client"

import { PricingPlan } from "@/components/pricing-plan-item"
import Link from "next/link"
import { pricing_plans } from "../board/plans/data"

// Section Header Component
const PricingSectionHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700 font-mono">
          Pricing
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">
          Choose the right plan for your business
        </h2>
        <p className="max-w-[900px] text-slate-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-mono">
          Flexible options to meet your market analysis needs, from startups to
          enterprise
        </p>
      </div>
    </div>
  )
}

// Contact Footer Component
const ContactFooter = () => {
  return (
    <div className="mt-12 text-center">
      <p className="text-slate-700 font-mono">
        Need a custom solution?{" "}
        <Link href="#" className="font-medium text-teal-600 hover:underline">
          Contact our sales team
        </Link>
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
              buttonText={plan.buttonText}
              popular={plan.popular}
              onPaymentSuccess={() => {}}
            />
          ))}
        </div>

        <ContactFooter />
      </div>
    </section>
  )
}
