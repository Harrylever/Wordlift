"use client"

import type React from "react"
import Link from "next/link"
import { ArrowLeft, BarChart3 } from "lucide-react"
import FormSection from "./(components)/form-section"

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Link href="/" className="absolute top-20 left-20 hidden md:block">
        <ArrowLeft size={25} className="text-black" />
      </Link>
      <div className="flex min-h-screen w-full flex-col bg-slate-50">
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-8 md:h-screen md:px-6">
          <div className="flex w-full items-center justify-between md:justify-center mb-8">
            <Link href="/" className="md:hidden">
              <ArrowLeft size={25} className="text-black" />
            </Link>
            <Link href="/" className="flex items-center gap-2 w-fit">
              <BarChart3 className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">MarketInsight</span>
            </Link>
            <div className="md:hidden" />
          </div>
          <div className="mx-auto grid w-full max-w-md gap-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-slate-600 font-mono">
                Enter your email and create a password to get started
              </p>
            </div>
            {/* Form Section */}
            <FormSection />

            <div className="mt-4 text-center text-sm font-mono">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-teal-600 hover:text-teal-700"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
