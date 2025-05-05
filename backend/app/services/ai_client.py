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

        user_content = prompt_data.user_content
        tone = prompt_data.tone
        audience = prompt_data.audience
        content_type = prompt_data.content_type
        length = prompt_data.length
        seo_keywords = prompt_data.seo_keywords
        focus_areas = prompt_data.focus_areas

        prompt = f"""
You are an expert content editor and language specialist with extensive knowledge of effective communication, SEO best practices, and persuasive writing techniques. Your task is to enhance the following content to make it more effective, engaging, and impactful.

ORIGINAL CONTENT:
{user_content}

ENHANCEMENT INSTRUCTIONS:
1. Improve overall clarity and readability while maintaining the original message and intent
2. Fix any grammar, punctuation, or spelling errors
3. Enhance sentence structure and flow for better readability
4. Optimize for SEO if keywords are provided
5. Adjust tone and style as specified
6. Ensure proper paragraph structure and logical organization
7. Make the content more engaging and persuasive

SPECIFIC REQUIREMENTS:
- Tone: {tone if tone else "Keep the existing tone or make it slightly more professional"}
- Target audience: {audience if audience else "General professional audience"}
- Content type: {content_type if content_type else "Standard professional content"}
- Length: {length if length else "Similar to original"}
- SEO keywords: {', '.join(seo_keywords) if seo_keywords else "No specific keywords required"}
- Focus areas: {', '.join(focus_areas) if focus_areas else "Overall improvement"}

RESPONSE FORMAT:
Provide only the enhanced content without explanations, comments, or meta-discussion. Do not include the original text in your response.

ENHANCED CONTENT:
"""
        return textwrap.dedent(prompt).strip()
