import { TabsContainer } from "./(components)/tabs-container"

export default function PlansPage() {
  return (
    <div>
      <div className="py-6 flex flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-xl font-medium tracking-tighter sm:text-2xl text-slate-900 font-sans">
          Plans and Pricing
        </h1>
      </div>
      <TabsContainer />
    </div>
  )
}
