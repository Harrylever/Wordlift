/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { FormSection } from "./form-section"
import { RenderInsights } from "./render-insights"
import { usePostGenerateAnalysis } from "../(hooks)"
import { useToastContext } from "@/components/toast"
import { GenerateAnalysisFormValues } from "../types"
import { useQueryClient } from "@tanstack/react-query"

export const InsightBoard = () => {
  const queryClient = useQueryClient()
  const [analysisData, setAnalysisData] = useState(null)
  const { setNotification } = useToastContext()

  const { mutateAsync: generateAnalysis, isPending } = usePostGenerateAnalysis()

  const handleSubmit = async (values: GenerateAnalysisFormValues) => {
    try {
      const response = await generateAnalysis(values)
      setAnalysisData(response.analysis)
      queryClient.invalidateQueries({ queryKey: ["get-user-profile"] })
      queryClient.invalidateQueries({ queryKey: ["get-user-info"] })
    } catch (error) {
      setNotification({
        type: "error",
        message: "Error generating analysis. Please try again.",
      })
      console.error("Error generating analysis:", error)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">
            Refine your Business Concept
          </CardTitle>
          <CardDescription className="font-sans">
            Share your business vision, target market, and competition to
            receive actionable feedback.
          </CardDescription>
        </CardHeader>

        <Board
          data={analysisData}
          isLoading={isPending}
          onSubmit={handleSubmit}
          restart={() => setAnalysisData(null)}
        />
      </Card>
    </>
  )
}

const Board = ({
  data,
  isLoading,
  onSubmit,
  restart,
}: {
  data: any | null
  isLoading: boolean
  restart: () => void
  onSubmit: (values: GenerateAnalysisFormValues) => void
}) => {
  if (isLoading) {
    return (
      <div className="mt-2 flex flex-col items-center justify-center">
        <Loader2 size={35} className="animate-spin text-gray-500" />
        <p className="text-sm font-sans text-gray-500 mt-1">
          Crunching your Insights...
        </p>
      </div>
    )
  }

  if (!data) {
    return <FormSection onSubmit={onSubmit} />
  }

  return <RenderInsights insights={data} restart={restart} />
}
