import { IPlan } from "./types"

export const marketinsights_plans: IPlan[] = [
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
    title: "Starter",
    description: "Perfect for small businesses and startups",
    price: 0,
    features: [
      { included: true, text: "20 Basic SWOT Analysis" },
      { included: true, text: "2 Customer Personas" },
      { included: true, text: "5 Competitor Profiles" },
      { included: true, text: "Basic Go to Market Template" },
      { included: false, text: "Market Simulation" },
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    title: "Professional",
    description: "For growing businesses and teams",
    price: 20000,
    features: [
      { included: true, text: "200 Advanced SWOT Analysis" },
      { included: true, text: "5 Customer Personas" },
      { included: true, text: "10 Competitor Profiles" },
      { included: true, text: "Complete Go to Market Toolkit" },
      { included: true, text: "Basic Market Simulation" },
    ],
    buttonText: "Get Started",
    popular: true,
  },
  {
    title: "Enterprise",
    description: "For large organizations with complex needs",
    price: 52000,
    features: [
      { included: true, text: "520 Enterprise SWOT Analysis" },
      { included: true, text: "Unlimited Customer Personas" },
      { included: true, text: "Unlimited Competitor Profiles" },
      { included: true, text: "Custom Go to Market Strategy" },
      { included: true, text: "Advanced Market Simulation" },
    ],
    buttonText: "Get Started",
    popular: false,
  },
]
