import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-white"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-teal-100 px-3 py-1 text-sm text-teal-700 font-mono">
              Our Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900">
              How MarketInsight Works
            </h2>
            <p className="max-w-[900px] text-slate-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-mono">
              Our platform simplifies market analysis with a four-step approach
              that delivers actionable insights
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          {/* Step 1 */}
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mb-16">
            <div className="flex justify-center lg:order-last">
              <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-xl bg-slate-50 shadow-sm">
                <Image
                  src="/images/swot-analysis.png"
                  width={400}
                  height={400}
                  alt="SWOT Analysis visualization"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                1
              </div>
              <h3 className="text-2xl font-bold font-mono">SWOT Analysis</h3>
              <p className="text-slate-700 font-mono">
                Our AI-powered tools analyze your business data to identify
                strengths, weaknesses, opportunities, and threats. Get a
                comprehensive view of your market position with visual reports
                and actionable recommendations.
              </p>
              <div className="flex items-center text-teal-600">
                <span className="font-medium font-mono">
                  Identify key competitive advantages
                </span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mb-16">
            <div className="flex justify-center">
              <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-xl border bg-slate-50 shadow-sm">
                <Image
                  src="/images/personas-competitors.png"
                  width={400}
                  height={400}
                  alt="Persona and competitor analysis"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                2
              </div>
              <h3 className="text-2xl font-bold font-mono">Personas & Competitors</h3>
              <p className="text-slate-700 font-mono">
                Create detailed customer personas and analyze your
                competitors&apos; strategies. Understand your target
                audience&apos;s needs and how your competition is addressing
                them.
              </p>
              <div className="flex items-center text-teal-600">
                <span className="font-medium font-mono">
                  Understand your market landscape
                </span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mb-16">
            <div className="flex justify-center lg:order-last">
              <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-xl border bg-slate-50 shadow-sm">
                <Image
                  src="/images/go-to-market-plan.png"
                  width={400}
                  height={400}
                  alt="Go to market planning"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                3
              </div>
              <h3 className="text-2xl font-bold font-mono">Go to Market Plan</h3>
              <p className="text-slate-700 font-mono">
                Develop comprehensive go-to-market strategies based on
                data-driven insights. Our platform helps you create timelines,
                allocate resources, and track progress toward your market goals.
              </p>
              <div className="flex items-center text-teal-600">
                <span className="font-medium font-mono">
                  Create effective launch strategies
                </span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex justify-center">
              <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-xl border bg-slate-50 shadow-sm">
                <Image
                  src="/images/market-simulation.png"
                  width={380}
                  height={380}
                  alt="Market simulation"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                4
              </div>
              <h3 className="text-2xl font-bold font-mono">Market Simulation</h3>
              <p className="text-slate-700 font-mono">
                Test your strategies in a simulated environment before
                implementing them in the real world. Our advanced algorithms
                predict market responses to different scenarios, helping you
                refine your approach.
              </p>
              <div className="flex items-center text-teal-600">
                <span className="font-medium font-mono">Test before you invest</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
