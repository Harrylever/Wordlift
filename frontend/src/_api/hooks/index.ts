"use client"

import { useMutation } from "@tanstack/react-query"
import httpService from "../HTTPService"

export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      return await httpService.post("/auth/logout")
    },
  })
}
