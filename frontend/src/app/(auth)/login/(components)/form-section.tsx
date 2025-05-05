"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginMutation } from "../(hooks)"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToastContext } from "@/components/toast"
import { CardContent, CardFooter } from "@/components/ui/card"
import { setToken } from "@/utils/auth"

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

      setToken("access_token", response.access_token)
      window.location.href = "/board"
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Login failed:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            className="border-purple-100 focus-visible:ring-purple-500"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {/* <Link
              href="/forgot-password"
              className="text-xs text-purple-600 hover:text-purple-700 hover:underline underline-offset-4"
            >
              Forgot your password?
            </Link> */}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            className="border-purple-100 focus-visible:ring-purple-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" />
          <Label
            htmlFor="remember"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>
      </CardContent>
      <CardFooter className="mt-5 flex flex-col space-y-4">
        <Button
          disabled={isPending}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isPending ? "Loading..." : "Sign In"}
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-600 hover:text-purple-700 hover:underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </form>
  )
}
