import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart2, CheckCircle, Edit3 } from "lucide-react"

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-32 bg-purple-50"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-800">
              Simple Process
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              How WordLift Works
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get instant feedback on your writing in three simple steps
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <Edit3 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">1. Paste Your Content</h3>
            <p className="text-muted-foreground">
              Simply paste your text into WordLift&apos;s editor or use our
              browser extension to analyze content anywhere.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <BarChart2 className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">2. Get Instant Analysis</h3>
            <p className="text-muted-foreground">
              Our AI analyzes your content for tone, grammar, clarity,
              structure, and SEO opportunities in seconds.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold">3. Apply Suggestions</h3>
            <p className="text-muted-foreground">
              Review AI-powered suggestions and apply them with one click to
              improve your content instantly.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Card className="w-full max-w-4xl border-purple-100 shadow-lg">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                    <Edit3 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium">
                      See WordLift in Action
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Watch how WordLift transforms your content
                    </p>
                  </div>
                </div>
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                  <div className="flex h-full items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-16 w-16 rounded-full bg-purple-600/90 text-white hover:bg-purple-700/90 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8"
                      >
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                      <span className="sr-only">Play video</span>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
