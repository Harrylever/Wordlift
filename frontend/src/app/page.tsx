import Header from "@/components/header"
import HeroSection from "./(components)/hero-section"
import HowItWorks from "./(components)/how-it-works"
import PricingSection from "./(components)/pricing-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <PricingSection />
      </main>

      <Footer />
    </div>
  )
}
