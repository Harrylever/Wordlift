import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./query-client"
import { ToastProvider } from "../toast"

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
    </QueryClientProvider>
  )
}
