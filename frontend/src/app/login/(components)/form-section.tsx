"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useLoginMutation } from "../(hooks)"
import { useToastContext } from "@/components/toast"

export default function FormSection() {
  const { setNotification } = useToastContext()
  const { mutateAsync: login, isPending } = useLoginMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      setNotification({
        type: "error",
        message: "Please fill in all fields",
      })
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setNotification({
        type: "error",
        message: "Please enter a valid email address",
      })
      return
    }
    if (password.length < 0) {
      setNotification({
        type: "error",
        message: "Password is required",
      })
      return
    }

    try {
      const response = await login({ email, password })

      if (!response) {
        setNotification({
          type: "error",
          message: "Login failed",
        })
        return
      }

      setNotification({
        type: "success",
        message: "Login successful",
      })
      window.location.href = "/board"
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="grid gap-4">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label
            htmlFor="email"
            className="font-mono text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="name@example.com"
            required
            className="border-slate-200"
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="font-mono text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Password
            </label>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="border-slate-200"
          />
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-teal-600 hover:bg-teal-700 font-mono"
        >
          {isPending ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </div>
  )
}
