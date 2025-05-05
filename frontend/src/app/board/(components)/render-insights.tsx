"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { MarkdownHooks } from "react-markdown"
import rehypeStarryNight from "rehype-starry-night"

export const RenderInsights = ({
  insights,
  restart,
}: {
  insights: string
  restart: () => void
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(insights)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  return (
    <div className="mt-2 flex flex-col items-center justify-center">
      <p className="text-sm font-sans text-gray-500">
        Content enhanced successfully!
      </p>

      <div id="insights" className="p-6 sm:p-10">
        <MarkdownHooks rehypePlugins={[rehypeStarryNight]}>
          {insights}
        </MarkdownHooks>

        <div className="mt-6 flex items-center gap-5">
          <Button
            onClick={handleCopy}
            className={cn(
              "bg-gray-600 text-white hover:bg-lemon/85",
              copied && "opacity-50 select-none"
            )}
          >
            {copied ? "Copied" : "Copy"}
          </Button>

          <Button
            className="bg-gray-600 text-white hover:bg-lemon/85"
            onClick={restart}
          >
            Enhance Again
          </Button>
        </div>
      </div>
    </div>
  )
}
