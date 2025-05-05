import type React from "react"
import Link from "next/link"
import { ArrowLeft, Edit3 } from "lucide-react"
import FormSection from "./(components)/form-section"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-purple-50 p-4">
      <Link href="/" className="absolute top-20 left-20 hidden md:block">
        <ArrowLeft size={25} className="text-black" />
      </Link>

      <div className="flex w-full items-center justify-between md:justify-center mb-8">
        <Link href="/" className="md:hidden">
          <ArrowLeft size={25} className="text-black" />
        </Link>
        <Link href="/" className="flex items-center gap-2">
          <Edit3 className="h-8 w-8 text-purple-600" />
          <span className="text-2xl font-bold">WordLift</span>
        </Link>
        <div className="md:hidden" />
      </div>

      <Card className="w-full max-w-md border-purple-100 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <FormSection />
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} WordLift. All rights reserved.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link
            href="#"
            className="hover:text-purple-600 hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="hover:text-purple-600 hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
