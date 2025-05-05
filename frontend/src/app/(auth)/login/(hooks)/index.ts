'use client'

import httpService from "@/_api/HTTPService"
import { useMutation } from "@tanstack/react-query"

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return await httpService.post("/auth/token", {
        email: data.email,
        password: data.password,
      })
    },
  })
}
