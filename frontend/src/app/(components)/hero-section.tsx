import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, TrendingUp, LineChart } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-normal sm:text-5xl xl:text-6xl text-slate-900">
                Make smarter market decisions with data-driven insights
              </h1>
              <p className="font-mono max-w-[600px] text-slate-700 md:text-xl">
                Comprehensive market analysis tools to help you understand your
                position, identify opportunities, and create winning strategies.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <Link href="#pricing" className="font-mono">Get Started</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#how-it-works" className="font-mono">See How It Works</Link>
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-600 pt-4">
              <div className="flex items-center font-mono">
                <CheckCircle className="mr-1 h-4 w-4 text-teal-600" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center font-mono">
                <CheckCircle className="mr-1 h-4 w-4 text-teal-600" />
                <span>No credit card required</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[600px] aspect-[4/3]">
              <Image
                src="/images/data-driven-insights.png"
                width={450}
                height={450}
                alt="Dashboard preview"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center rounded-lg border bg-white p-6 shadow-sm">
            <BarChart3 className="h-10 w-10 text-teal-600 mb-4" />
            <h3 className="text-lg font-semibold font-mono">SWOT Analysis</h3>
            <p className="text-center text-sm text-slate-600 mt-2 font-mono">
              Identify strengths, weaknesses, opportunities, and threats
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border bg-white p-6 shadow-sm">
            <Users className="h-10 w-10 text-teal-600 mb-4" />
            <h3 className="text-lg font-semibold font-mono">Personas & Competitors</h3>
            <p className="text-center text-sm text-slate-600 mt-2 font-mono">
              Understand your audience and competition landscape
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border bg-white p-6 shadow-sm">
            <TrendingUp className="h-10 w-10 text-teal-600 mb-4" />
            <h3 className="text-lg font-semibold font-mono">Go to Market Plan</h3>
            <p className="text-center text-sm text-slate-600 mt-2 font-mono">
              Create effective strategies for product launches
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border bg-white p-6 shadow-sm">
            <LineChart className="h-10 w-10 text-teal-600 mb-4" />
            <h3 className="text-lg font-semibold font-mono">Market Simulation</h3>
            <p className="text-center text-sm text-slate-600 mt-2 font-mono">
              Test scenarios before implementing in the real world
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}
