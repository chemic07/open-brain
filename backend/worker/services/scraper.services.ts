// worker/services/scraper.service.ts
import axios from "axios";
import * as cheerio from "cheerio";

export interface ScrapedData {
  title: string;
  description: string;
  content: string;
  favicon?: string;
  image?: string;
}

export class ScraperService {
  static async scrapeURL(url: string): Promise<ScrapedData> {
    try {
      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        maxRedirects: 5,
      });

      const $ = cheerio.load(response.data);

      // Remove script and style tags
      $("script, style, noscript, iframe").remove();

      // Extract title
      const title =
        $('meta[property="og:title"]').attr("content") ||
        $('meta[name="twitter:title"]').attr("content") ||
        $("title").text() ||
        $("h1").first().text() ||
        "";

      // Extract description
      const description =
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        $('meta[name="description"]').attr("content") ||
        "";

      // Extract image
      const image =
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content");

      // Extract main content
      let content = "";
      const contentSelectors = [
        "article",
        "main",
        '[role="main"]',
        ".content",
        "#content",
        ".post-content",
        ".entry-content",
      ];

      for (const selector of contentSelectors) {
        const extracted = $(selector).text().trim();
        if (extracted.length > content.length) {
          content = extracted;
        }
      }

      // Fallback to body if no content found
      if (!content) {
        content = $("body").text().trim();
      }

      // Clean content
      content = content.replace(/\s+/g, " ").trim().slice(0, 10000);

      return {
        title: title.trim(),
        description: description.trim(),
        content,
        image,
      };
    } catch (error: any) {
      console.error("Scraping error:", error.message);
      throw new Error(`Failed to scrape URL: ${error.message}`);
    }
  }
}
