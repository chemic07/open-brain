import { Job } from "bullmq";
import { ScraperService } from "../services/scraper.services";
import { Content } from "../../src/models/content.model";
import { Link } from "../../src/models/link.model";
import { AIService } from "../services/ai.services";
import { chunkText } from "../utils/chunkText";
import { Embedding } from "../../shared/models/embedding.model";

export async function processEmbedding(job: Job) {
  const { contentId, userId, url, title } = job.data;

  console.log(`[Job ${job.id}] Starting embedding process for: ${title}`);

  try {
    //scraper
    await job.updateProgress(10);

    let scrapedData;
    try {
      scrapedData = await ScraperService.scrapeURL(url);
    } catch {
      scrapedData = { title, description: "", content: title };
    }
    console.log("***********************************");
    console.log(scrapedData);

    // find content from mongodb
    await job.updateProgress(30);
    console.log("i have reached here");

    const content = await Content.findById(contentId).populate("link");
    if (!content) throw new Error("Content not found");

    await Link.findByIdAndUpdate(content.link, {
      title: scrapedData.title || title,
      description: scrapedData.description,
    });

    console.log("content" + content);

    // gen summary
    await job.updateProgress(50);

    let summary = scrapedData.description;

    if (scrapedData.content.length > 200) {
      try {
        const contentForAI = scrapedData.content.substring(0, 5000);
        console.log("content sent to Ai + " + contentForAI);
        summary = await AIService.generateSummary(contentForAI);
        await Link.findByIdAndUpdate(content.link, { description: summary });
      } catch (error) {
        console.log(error);
      }
    }

    //chunking it
    await job.updateProgress(75);

    const fullText = `
      ${scrapedData.title || title}
      ${summary || ""}
      ${scrapedData.content}
    `;

    const chunks = chunkText(fullText, 400, 80);

    console.log(`[Job ${job.id}] Created ${chunks.length} chunks`);

    //embed
    await job.updateProgress(85);

    for (let i = 0; i < chunks.length; i++) {
      const vector = await AIService.generateEmbedding(chunks[i]!);

      await Embedding.findOneAndUpdate(
        { contentId, chunkIndex: i },
        {
          contentId,
          userId,
          chunkIndex: i,
          embedding: vector,
          text: chunks[i],
          metadata: {
            title: scrapedData.title || title,
            description: summary || "",
            url,
          },
        },
        { upsert: true },
      );
    }

    await job.updateProgress(100);

    console.log(`[Job ${job.id}] Completed (${chunks.length} embeddings)`);

    return {
      success: true,
      contentId,
      chunks: chunks.length,
    };
  } catch (error: any) {
    console.error(`[Job ${job.id}] Failed:`, error.message);
    throw error;
  }
}
