import { pipeline } from "@huggingface/transformers";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
      Keep summaries under 20 words and focus on the main points.
      
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
}
