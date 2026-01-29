// worker/services/ai.service.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export class AIService {
  static async generateEmbedding(text: string): Promise<number[]> {
    try {
      const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text.slice(0, 8000),
      });

      return response.data[0]!.embedding;
    } catch (error) {
      console.error("Error generating embedding:", error);
      throw new Error("Failed to generate embedding");
    }
  }

  static async generateSummary(text: string): Promise<string> {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that creates concise, informative summaries. Keep summaries under 150 words and focus on the main points.",
          },
          {
            role: "user",
            content: `Summarize this content:\n\n${text.slice(0, 4000)}`,
          },
        ],
        max_tokens: 200,
        temperature: 0.5,
      });

      return response.choices[0]!.message.content || "";
    } catch (error) {
      console.error("Error generating summary:", error);
      throw new Error("Failed to generate summary");
    }
  }
}
