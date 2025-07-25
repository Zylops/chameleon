import { GEMINI_KEY } from "$env/static/private";
import { model, prompt } from "$lib";
import {
    GenerateContentResponse,
    GoogleGenAI,
    Type,
} from '@google/genai';
import type { RequestHandler } from "@sveltejs/kit";

const ai = new GoogleGenAI({
        apiKey: GEMINI_KEY
    })
    
const config = {
    "responseMimeType": 'application/json',
    "responseSchema": {
      type: Type.OBJECT,
      required: ["word"],
      properties: {
        word: {
          type: Type.STRING,
        },
      },
    },
}

export const GET: RequestHandler = async ({ params }) => {
    const cleanedCategory: string = params.category.trim().split(" ")[0] // only taking first word of category to try to circumvent unwanted prompt injection

    const injectedPrompt = prompt.replace("{CATEGORY}", cleanedCategory)
        
    const contents = [
        {
            role: "user",
            parts: [
                {
                    "text": injectedPrompt
                }
            ]
        }
    ]

    
    const response: GenerateContentResponse = await ai.models.generateContent({
        model, config, contents
    })

    
    const word = JSON.parse(response.candidates[0].content?.parts[0].text)

    return new Response(JSON.stringify(word))
    
}