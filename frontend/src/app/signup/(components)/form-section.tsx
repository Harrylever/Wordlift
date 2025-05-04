"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useSignupMutation } from "../(hooks)"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useToastContext } from "@/components/toast"

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
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            className="border-slate-200"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="first_name"
            className="font-mono text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            First Name
          </label>
          <Input
            id="first_name"
            name="first_name"
            type="text"
            placeholder="John"
            required
            className="border-slate-200"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="last_name"
            className="font-mono text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Last Name
          </label>
          <Input
            id="last_name"
            name="last_name"
            type="text"
            placeholder="Doe"
            required
            className="border-slate-200"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="company_name"
            className="font-mono text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Company Name
          </label>
          <Input
            id="company_name"
            name="company_name"
            type="text"
            placeholder="Rheutical Corp"
            required
            className="border-slate-200"
          />
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="password"
            className="font-mono text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Create a password"
            required
            className="border-slate-200"
          />
          <p className="text-xs text-slate-500">
            Password must be at least 8 characters long
          </p>
        </div>
        <div className="grid gap-2">
          <label
            htmlFor="confirm-password"
            className="font-mono text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            placeholder="Confirm your password"
            required
            className="border-slate-200"
          />
        </div>
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox id="terms" name="terms" required />
          <label
            htmlFor="terms"
            className="font-mono text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link
              href="#"
              className="font-medium text-teal-600 hover:text-teal-700 hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="font-medium text-teal-600 hover:text-teal-700 hover:underline"
            >
              Privacy Policy
            </Link>
          </label>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="font-mono w-full bg-teal-600 hover:bg-teal-700"
        >
          {isPending ? "Loading..." : "Create Account"}
        </Button>
      </form>
    </div>
  )
}
