"use client"

import httpService from "@/_api/HTTPService"
import { useMutation } from "@tanstack/react-query"

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (data: {
      email: string
      first_name: string
      last_name: string
      password: string
      company_name: string
    }) => {
      return await httpService.post("/auth/create-account", { ...data })
    },
  })
}
