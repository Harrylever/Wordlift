"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useSignupMutation } from "../(hooks)"
import { Button } from "@/components/ui/button"
import { useToastContext } from "@/components/toast"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function FormSection() {
  const { setNotification } = useToastContext()
  const { mutateAsync: createAccount, isPending } = useSignupMutation()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const firstName = formData.get("first_name") as string
    const lastName = formData.get("last_name") as string
    const companyName = formData.get("company_name") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirm-password") as string

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email)
    const isValidPassword = (password: string) => password.length >= 7

    if (!isValidEmail(email)) {
      setNotification({
        type: "error",
        message: "Please enter a valid email address",
      })
      return
    }
    if (!isValidPassword(password)) {
      setNotification({
        type: "error",
        message: "Password must be at least 7 characters long",
      })
      return
    }

    if (password !== confirmPassword) {
      setNotification({
        type: "error",
        message: "Passwords do not match",
      })
      return
    }

    try {
      const response = await createAccount({
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        company_name: companyName,
      })

      if (!response) {
        setNotification({
          type: "error",
          message: "Account creation failed",
        })
        return
      }

      setNotification({
        type: "success",
        message: "Account created successfully",
      })
      window.location.href = "/login"
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Account creation failed:", error)
      setNotification({
        type: "error",
        message: "Account creation failed",
      })
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
            required
            placeholder="your@email.com"
            className="border-purple-100 focus-visible:ring-purple-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input
            id="first_name"
            type="text"
            name="first_name"
            required
            placeholder="John"
            className="border-purple-100 focus-visible:ring-purple-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input
            id="last_name"
            type="text"
            name="last_name"
            required
            placeholder="Doe"
            className="border-purple-100 focus-visible:ring-purple-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company_name">Company Name</Label>
          <Input
            id="company_name"
            type="text"
            name="company_name"
            required
            placeholder="React Inc."
            className="border-purple-100 focus-visible:ring-purple-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="********"
            required
            className="border-purple-100 focus-visible:ring-purple-500"
          />
          <p className="text-xs text-muted-foreground">
            Password must be at least 7 characters long
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            name="confirm-password"
            required
            placeholder="********"
            type="password"
            className="border-purple-100 focus-visible:ring-purple-500"
          />
        </div>
      </CardContent>
      <CardFooter className="mt-5 flex flex-col space-y-4">
        <Button
          disabled={isPending}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {isPending ? "Loading..." : "Create Account"}
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-purple-600 hover:text-purple-700 hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </CardFooter>
    </form>
  )
}
