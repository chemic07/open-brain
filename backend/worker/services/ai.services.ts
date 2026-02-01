import { pipeline } from "@huggingface/transformers";
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// init gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

export class AIService {
  private static extractor: any = null;

  //local transformers embedding
  static async generateEmbedding(text: string): Promise<number[]> {
    try {
      if (!this.extractor) {
        this.extractor = await pipeline(
          "feature-extraction",
          "Xenova/all-MiniLM-L6-v2",
        );
      }

      const output = await this.extractor(text, {
        pooling: "mean",
        normalize: true,
      });

      // converting the data
      return Array.from(output.data);
    } catch (error) {
      console.error("embedding error:", error);
      throw new Error("Failed to generate  embedding");
    }
  }

  static async generateSummary(text: string): Promise<string> {
    try {
      const prompt = `You are a helpful assistant that creates concise, informative summaries. 
      Keep summaries under 200 words and focus on the main points.
      
      Summarize this content:
      ${text.slice(0, 8000)}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini err", error);
      throw new Error("Failed to generate summary");
    }
  }

  static async generateTags(
    title: string,
    description: string,
  ): Promise<string[]> {
    try {
      const prompt = `You are a tagging expert. Generate 3-7 relevant, specific tags for this content.
      Return ONLY a comma-separated list of lowercase tags, no explanations or formatting.
      
      Title: ${title}
      Description: ${description.slice(0, 500)}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const tagsText = response.text();

      return tagsText
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
        .slice(0, 7);
    } catch (error) {
      console.error("Gemini tags error:", error);
      return [];
    }
  }

  static async chatWithContext(
    userMessage: string,
    context: string,
    conversationHistory?: ChatMessage[],
  ): Promise<string> {
    try {
      // Build conversation history for Gemini
      let conversationText = "";
      if (conversationHistory && conversationHistory.length > 0) {
        conversationText = conversationHistory
          .slice(-6) // Last 3 exchanges
          .map(
            (msg) =>
              `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`,
          )
          .join("\n\n");
      }

      const prompt = `You are an intelligent assistant helping a user understand and explore their saved content collection.

**Instructions:**
- Answer questions based ONLY on the provided context from the user's saved links
- If the answer isn't in the context, say "I don't have information about that in your saved content"
- Be conversational and helpful
- Reference specific sources when relevant (e.g., "According to Source 1...")
- Keep answers concise but informative (under 300 words)

**User's Saved Content:**
${context}

${conversationHistory && conversationHistory.length > 0 ? `\n**Previous Conversation:**\n${conversationText}\n` : ""}

**Current Question:**
${userMessage}

**Your Response:**`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini chat error:", error);
      throw new Error("Failed to generate chat response");
    }
  }
}
