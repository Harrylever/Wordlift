"use client"

import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { GenerateAnalysisFormValues } from "../types"

export const FormSection = ({
  onSubmit,
}: {
  onSubmit: (values: GenerateAnalysisFormValues) => void
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values: GenerateAnalysisFormValues = {
      idea: formData.get("business_idea") as string,
      industry: formData.get("industry") as string,
      audience: formData.get("audience") as string,
      geography: formData.get("geography") as string,
      competition: formData.get("competition") as string,
      additional_info: formData.get("additional_info") as string,
    }
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="grid gap-4">
        {/* Enter your business idea */}
        <div>
          <label
            htmlFor="business_idea"
            className="text-gray-500 text-sm font-mono"
          >
            Enter your Business Idea
          </label>
          <Textarea
            required
            name="business_idea"
            className="mt-2"
            placeholder="e.g. A mobile app that connects local farmers directly with restaurants"
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className="text-gray-500 text-sm font-mono">
            Industry
          </label>
          <Input
            required
            name="industry"
            className="mt-2"
            placeholder="e.g. Food & Agriculture Technology"
          />
        </div>

        {/* Audience */}
        <div>
          <label htmlFor="audience" className="text-gray-500 text-sm font-mono">
            Describe your Audience
          </label>
          <Input
            required
            name="audience"
            className="mt-2"
            placeholder="e.g. Small to medium restaurants and local farmers"
          />
        </div>

        {/* Geography */}
        <div>
          <label
            htmlFor="geography"
            className="text-gray-500 text-sm font-mono"
          >
            Geography
          </label>
          <Input
            required
            name="geography"
            className="mt-2"
            placeholder="e.g. Starting in the Pacific Northwest, then expanding nationally"
          />
        </div>

        {/* Competition */}
        <div>
          <label
            htmlFor="competition"
            className="text-gray-500 text-sm font-mono"
          >
            Competition
          </label>
          <Input
            required
            name="competition"
            className="mt-2"
            placeholder="e.g. Some farm-to-table platforms exist but focus on consumers rather than B2B"
          />
        </div>

        {/* Additional information */}
        <div>
          <label
            htmlFor="additional_info"
            className="text-gray-500 text-sm font-mono"
          >
            Additional Information
          </label>
          <Textarea
            name="additional_info"
            className="mt-2"
            placeholder="e.g. Planning to integrate delivery logistics as a premium feature"
          />
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="text-sm px-10 w-fit bg-teal-500 text-white font-mono font-medium py-2 rounded-md hover:bg-teal-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </CardContent>
    </form>
  )
}
