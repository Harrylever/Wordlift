/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card"
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
          <CardTitle className="font-sans">Content Enhancement</CardTitle>
          <CardDescription className="font-sans">
            Enter your content and preferences to receive AI-powered improvement
            suggestions
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
  if (!data) {
    return <FormSection onSubmit={onSubmit} isSubmitting={isLoading} />
  }

  return <RenderInsights insights={data} restart={restart} />
}
