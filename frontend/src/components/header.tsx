"use client"

import type React from "react"

import Link from "next/link"
import { Edit3, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useMobile } from "@/hooks/use-mobile"

export default function Header() {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Edit3 className="h-6 w-6 text-purple-600" />
          <span className="text-xl font-bold">WordLift</span>
        </div>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>

            {isMenuOpen && (
              <div className="absolute left-0 top-16 w-full bg-background p-4 shadow-md">
                <nav className="flex flex-col space-y-4">
                  <Link
                    href="#features"
                    onClick={toggleMenu}
                    className="font-mono text-sm font-medium transition-colors hover:text-primary"
                  >
                    Features
                  </Link>
                  <Link
                    href="#how-it-works"
                    onClick={toggleMenu}
                    className="font-mono text-sm font-medium transition-colors hover:text-primary"
                  >
                    How It Works
                  </Link>
                  <Link
                    href="#pricing"
                    onClick={toggleMenu}
                    className="font-mono text-sm font-medium transition-colors hover:text-primary"
                  >
                    Pricing
                  </Link>
                  <div className="pt-4">
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/login">Log in</Link>
                    </Button>
                  </div>
                  <div>
                    <Button
                      asChild
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Link href="/signup">Get Started</Link>
                    </Button>
                  </div>
                </nav>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="flex items-center gap-6">
              <Link
                href="#features"
                className="font-mono text-sm font-medium transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="font-mono text-sm font-medium transition-colors hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href="#pricing"
                className="font-mono text-sm font-medium transition-colors hover:text-primary"
              >
                Pricing
              </Link>
            </nav>
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost">
                <Link href="/login" className="font-mono">
                  Log in
                </Link>
              </Button>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/signup" className="font-mono">
                  Get Started
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
