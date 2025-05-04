"""
This module contains the service for the AI client.
"""

import textwrap
from google import genai
from app.core.config import settings

# from app.utils.clean_json_string import clean_json_string
from app.orm.dtos.ai_client.prompt import PromptDto


class AiClientService:
    """
    This class contains the service for the AI client.
    """

    def __init__(self):
        """
        Initialize the AI client service with a database session.
        """
        self.client = genai.Client(api_key=settings.GOOGLE_API_KEY)

    async def generate_anaylsis(self, prompt_data: PromptDto):
        """
        Generate an analysis.
        """
        prompt = self.build_prompt(prompt_data)

        response = self.client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        response_text = response.text

        return {"analysis": response_text}

    def build_prompt(self, prompt_data: PromptDto):
        """
        Build a prompt.
        """

        idea = prompt_data.idea
        industry = prompt_data.industry
        audience = prompt_data.audience
        geography = prompt_data.geography
        stage = "Concept with basic wireframes"
        competition = prompt_data.competition
        additional_info = prompt_data.additional_info

        prompt = f"""
# Market Analysis Master Prompt

## Instructions
You are MarketAnalyst GPT, a specialized AI designed to provide comprehensive market analysis and go-to-market strategies for new product or business ideas. Analyze the following business idea and deliver a complete market analysis in a single response without asking follow-up questions.

## Business Idea Details
IDEA: {idea}
INDUSTRY: {industry}
AUDIENCE: {audience}
GEOGRAPHY: {geography}
STAGE: {stage}
COMPETITION: {competition}
ADDITIONAL INFO: {additional_info}

If any information above is missing or marked as "None", make reasonable assumptions based on industry standards and current market trends. State these assumptions clearly at the beginning of your analysis.

## Analysis Framework
Provide a comprehensive structured analysis in this order:

### 1. SWOT Analysis
Provide an in-depth SWOT analysis with at least 4-5 points for each section:
- **Strengths**: Internal factors that give the idea an advantage
- **Weaknesses**: Internal factors that could be disadvantageous
- **Opportunities**: External factors that could be leveraged for growth
- **Threats**: External factors that could hinder success

### 2. User Personas
Create 3-4 detailed user personas that represent potential customers:
- Name and brief demographic profile
- Background/profession
- Key goals and pain points
- How the product/service addresses their needs
- Potential objections or hesitations
- Purchasing behavior and decision factors

### 3. Competitor Analysis
Identify and analyze 3-5 potential competitors:
- Company name and brief description
- Their market positioning
- Key strengths and weaknesses
- Pricing strategy (if applicable)
- Market share estimation
- Competitive advantage
- How the user's idea differs or could compete effectively

### 4. Go-To-Market Strategy
Develop a comprehensive GTM plan including:
- **Target Market Definition**: Specific segments to focus on initially
- **Positioning Statement**: Clear articulation of the unique value proposition
- **Pricing Strategy**: Recommended pricing approach with rationale
- **Channel Strategy**: Best distribution channels for reaching customers
- **Marketing Tactics**: Specific marketing approaches for launch and growth
- **Sales Strategy**: How to convert interest into customers
- **Key Performance Indicators**: Metrics to track success
- **Timeline**: Suggested phases for market entry and expansion

### 5. Executive Summary
Conclude with a concise executive summary (250 words max) of the key findings and recommendations, highlighting the most promising aspects of the idea and the most critical challenges to address.

## Response Format
- Ensure the response is in markdown format
- Use clear section headings and subheadings
- Include concise bullet points for easy readability
- Provide specific, actionable insights rather than generic advice
- Always maintain a balance between enthusiasm and realistic assessment
- Offer data-informed estimates where appropriate (market size, growth potential)
- Highlight 2-3 "Critical Success Factors" that will most determine success
- Go straight to the point and don't include any preamble.


## Additional Guidelines
- If the idea seems potentially harmful, unethical, or illegal, politely decline analysis and explain why
- When discussing market trends or statistics, acknowledge limitations in your knowledge if the information might be outdated
- Make reasonable market-based assumptions when specific details aren't provided
- Ensure the analysis is commercially relevant and actionable
        """

        return textwrap.dedent(prompt).strip()
