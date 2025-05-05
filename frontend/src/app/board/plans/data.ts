import { IPlan } from "./types"

export const wordlift_plans: IPlan[] = [
  {
    id: "1",
    plan_code: process.env.NEXT_PUBLIC_PAYSTACK_PLAN_PROFESSIONAL as string,
    name: "Professional",
    amount:
      Number(
        process.env.NEXT_PUBLIC_PAYSTACK_PLAN_PROFESSIONAL_PRICE as string
      ) || 0,
    interval: "month",
  },
  {
    id: "2",
    plan_code: process.env.NEXT_PUBLIC_PAYSTACK_PLAN_ENTERPRISE as string,
    name: "Enterprise",
    amount:
      Number(
        process.env.NEXT_PUBLIC_PAYSTACK_PLAN_ENTERPRISE_PRICE as string
      ) || 0,
    interval: "month",
  },
]

export const pricing_plans = [
  {
    title: "Free",
    description: "Perfect for trying out WordLift",
    price: 0,
    features: [
      "Basic grammar & spelling checks",
      "Up to 500 words per analysis",
      "5 analyses per day",
      "Basic SEO suggestions"
    ],
    isPopular: false,
    buttonVariant: "outline"
  },
  {
    title: "Professional",
    description: "For professional writers & bloggers",
    price: 23000,
    features: [
      "Advanced grammar & style analysis",
      "Up to 3,000 words per analysis",
      "Unlimited analyses",
      "Advanced SEO optimization",
      "Tone & clarity suggestions",
      "Browser extension"
    ],
    isPopular: true,
    buttonVariant: "default"
  },
  {
    title: "Enterprise",
    description: "For enterprise teams & agencies",
    price: 55000,
    features: [
      "Everything in Pro",
      "Up to 10,000 words per analysis",
      "Team collaboration features",
      "Brand voice customization",
      "Content performance analytics",
      "Priority support"
    ],
    isPopular: false,
    buttonVariant: "outline"
  }
]
