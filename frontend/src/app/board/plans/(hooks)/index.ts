"use client"

import httpService from "@/_api/HTTPService"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetUserSubscription = () => {
  return useQuery({
    queryKey: ["get-user-subscription"],
    queryFn: async () => {
      return await httpService.get("/v1/subscriptions/me")
    },
  })
}

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: ["get-user-info"],
    queryFn: async () => {
      return await Promise.all([
        await httpService.get("/v1/users/me"),
        await httpService.get("/v1/subscriptions/me"),
      ])
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const useGetSubscriptionPlans = () => {
  return useQuery({
    queryKey: ["subscription-plans"],
    queryFn: async () => {
      return await httpService.get("/v1/subscriptions/plans")
    },
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10, // 10 minutes
  })
}

export const useVerifyPlanPaymentMutation = () => {
  return useMutation({
    mutationFn: async ({
      plan_code,
      reference,
    }: {
      plan_code: string
      reference: string
    }) => {
      return await httpService.post("/v1/subscriptions/verify-payment", {
        plan_code,
        reference,
      })
    },
  })
}

export const useGetUserCredits = () => {
  return useQuery({
    queryKey: ["user-credits"],
    queryFn: async () => {
      return await httpService.get("/v1/users/credits/me")
    },
    staleTime: Infinity,
    gcTime: 60 * 1000 * 10, // 10 minutes
  })
}
