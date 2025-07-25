export const model = 'gemini-2.0-flash'
export const prompt = `Generate a single word in the format {word: STRING}.

The word should meet these criteria:
- It must be a common noun or category (e.g., "volcano", "kitchen", "airplane").
- It should be general enough that a 3rd grader would understand it.
- It should not be too simple (e.g., avoid words like "ball" or "dog").
- It must be something that can be described indirectly, without using the word itself (so it works in a deduction game).
- Avoid proper nouns, brand names, or abstract concepts.
Only return a JSON object, no explanations or extra content.

Use this category or theme for inspiration: {CATEGORY}`

// the prompt can be modified above to fine tune generated topics. make sure to include {CATEGORY} in your prompt so that the given category can be injected at topic generation.