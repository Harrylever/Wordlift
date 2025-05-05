"use client"

import { useState } from "react"
import { Label } from "@radix-ui/react-label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { GenerateAnalysisFormValues } from "../types"

interface FormData {
  user_content: string
  tone: string
  audience: string
  content_type: string
  length: string
  focus_areas: string[]
}

// Define the available options
const toneOptions = [
  "friendly",
  "professional",
  "casual",
  "formal",
  "enthusiastic",
  "authoritative",
  "conversational",
]

const audienceOptions = [
  "small business owners",
  "corporate executives",
  "general public",
  "technical professionals",
  "students",
  "educators",
  "healthcare professionals",
]

const contentTypeOptions = [
  "blog post",
  "social media post",
  "email",
  "newsletter",
  "product description",
  "website copy",
  "press release",
]

const lengthOptions = [
  "10% shorter",
  "same length",
  "10% longer",
  "25% longer",
  "50% longer",
  "50% shorter",
]

const focusAreaOptions = [
  { id: "clarity", label: "Clarity" },
  { id: "persuasiveness", label: "Persuasiveness" },
  { id: "engagement", label: "Engagement" },
  { id: "seo", label: "SEO Optimization" },
  { id: "grammar", label: "Grammar & Spelling" },
  { id: "tone", label: "Tone Consistency" },
  { id: "structure", label: "Structure" },
]

export const FormSection = ({
  onSubmit,
  isSubmitting,
}: {
  onSubmit: (values: GenerateAnalysisFormValues) => void
  isSubmitting: boolean
}) => {
  const [formData, setFormData] = useState<FormData>({
    user_content: "",
    tone: "",
    audience: "",
    content_type: "",
    length: "same length",
    focus_areas: [],
  })

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, user_content: e.target.value })
  }

  const handleSelectChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleFocusAreaChange = (id: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        focus_areas: [...formData.focus_areas, id],
      })
    } else {
      setFormData({
        ...formData,
        focus_areas: formData.focus_areas.filter((area) => area !== id),
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      focus_areas: formData.focus_areas.join(","),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <div className="space-y-2">
        <Label htmlFor="user_content" className="text-base">
          Your Content
        </Label>
        <Textarea
          id="user_content"
          placeholder="Paste your content here..."
          className="min-h-[200px] border-purple-100 focus-visible:ring-purple-500"
          value={formData.user_content}
          onChange={handleContentChange}
          required
        />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="tone" className="text-base">
            Tone
          </Label>
          <Select
            value={formData.tone}
            onValueChange={(value) => handleSelectChange("tone", value)}
            required
          >
            <SelectTrigger
              id="tone"
              className="border-purple-100 focus:ring-purple-500"
            >
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              {toneOptions.map((tone) => (
                <SelectItem key={tone} value={tone}>
                  {tone.charAt(0).toUpperCase() + tone.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="audience" className="text-base">
            Target Audience
          </Label>
          <Select
            value={formData.audience}
            onValueChange={(value) => handleSelectChange("audience", value)}
            required
          >
            <SelectTrigger
              id="audience"
              className="border-purple-100 focus:ring-purple-500"
            >
              <SelectValue placeholder="Select audience" />
            </SelectTrigger>
            <SelectContent>
              {audienceOptions.map((audience) => (
                <SelectItem key={audience} value={audience}>
                  {audience.charAt(0).toUpperCase() + audience.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content_type" className="text-base">
            Content Type
          </Label>
          <Select
            value={formData.content_type}
            onValueChange={(value) => handleSelectChange("content_type", value)}
            required
          >
            <SelectTrigger
              id="content_type"
              className="border-purple-100 focus:ring-purple-500"
            >
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              {contentTypeOptions.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="length" className="text-base">
            Desired Length
          </Label>
          <Select
            value={formData.length}
            onValueChange={(value) => handleSelectChange("length", value)}
            required
          >
            <SelectTrigger
              id="length"
              className="border-purple-100 focus:ring-purple-500"
            >
              <SelectValue placeholder="Select length" />
            </SelectTrigger>
            <SelectContent>
              {lengthOptions.map((length) => (
                <SelectItem key={length} value={length}>
                  {length}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <Label className="text-base">Focus Areas</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {focusAreaOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={formData.focus_areas.includes(option.id)}
                onCheckedChange={(checked) =>
                  handleFocusAreaChange(option.id, checked === true)
                }
              />
              <Label
                htmlFor={option.id}
                className="text-sm font-normal cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="mt-10 w-full bg-purple-600 hover:bg-purple-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enhancing Content...
          </>
        ) : (
          "Enhance My Content"
        )}
      </Button>
    </form>
  )
}
