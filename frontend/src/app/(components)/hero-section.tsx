import type React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Search, BarChart2, Edit3 } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Elevate Your Writing with Instant Feedback
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Get real-time suggestions for tone, grammar, clarity, and
                structure. Improve your content and optimize for SEO in seconds.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Try For Free
              </Button>
              <Button variant="outline">See How It Works</Button>
            </div>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex -space-x-2">
                <Image
                  src="/images/avatar-1.jpg"
                  alt="User"
                  width={40}
                  height={40}
                  className="w-[43px] h-[43px] rounded-full border-2 border-background object-center object-cover"
                />
                <Image
                  src="/images/avatar-2.jpg"
                  alt="User"
                  width={40}
                  height={40}
                  className="w-[43px] h-[43px] rounded-full border-2 border-background object-center object-cover"
                />
                <Image
                  src="/images/avatar-3.jpg"
                  alt="User"
                  width={40}
                  height={40}
                  className="w-[43px] h-[43px] rounded-full border-2 border-background object-center object-cover"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Trusted by{" "}
                <span className="font-medium text-foreground">10,000+</span>{" "}
                writers & content creators
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md border-purple-100 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Content Analysis</CardTitle>
                <CardDescription>
                  Instant feedback on your writing
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-purple-100"></div>
                    <div className="h-4 w-[80%] rounded bg-purple-100"></div>
                    <div className="h-4 w-[60%] rounded bg-purple-100"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 rounded-lg border border-purple-100 p-2">
                      <div className="rounded-full bg-green-100 p-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="text-sm">Grammar</div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-purple-100 p-2">
                      <div className="rounded-full bg-amber-100 p-1">
                        <Edit3 className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="text-sm">Clarity</div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-purple-100 p-2">
                      <div className="rounded-full bg-blue-100 p-1">
                        <BarChart2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="text-sm">Structure</div>
                    </div>
                    <div className="flex items-center gap-2 rounded-lg border border-purple-100 p-2">
                      <div className="rounded-full bg-purple-100 p-1">
                        <Search className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="text-sm">SEO</div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  Analyze My Content
                </Button>
              </CardFooter>
            </Card>
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
