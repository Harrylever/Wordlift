import type React from "react"
import Link from "next/link"
import { BarChart3 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white py-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">MarketInsight</span>
            </Link>
            <p className="text-sm text-slate-600 font-mono">
              Comprehensive market analysis tools to help you understand your
              position, identify opportunities, and create winning strategies.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-600 hover:text-teal-600">
                <TwitterIcon className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-600 hover:text-teal-600">
                <LinkedinIcon className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-slate-600 hover:text-teal-600">
                <FacebookIcon className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold font-mono">Product</h4>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  SWOT Analysis
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  Personas & Competitors
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  Go to Market Plan
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  Market Simulation
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold font-mono">Company</h4>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold font-mono">Legal</h4>
            <ul className="space-y-2 text-sm font-mono">
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-teal-600">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-slate-600 font-mono">
          <p>
            © {new Date().getFullYear()} MarketInsight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}
