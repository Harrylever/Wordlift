"use client"

import httpService from "@/_api/HTTPService"
import { useMutation, useQuery } from "@tanstack/react-query"
import { GenerateAnalysisFormValues } from "../types"

export const usePostGenerateAnalysis = () => {
  return useMutation({
    mutationFn: async (content: GenerateAnalysisFormValues) => {
      return await httpService.post("/v1/agents/analysize", { ...content })
    },
  })
}

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["get-user-profile"],
    queryFn: async () => {
      return await httpService.get("/v1/users/me")
    },
  })
}
