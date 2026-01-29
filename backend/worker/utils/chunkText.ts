export function chunkText(text: string, size = 500, overlap = 100): string[] {
  const chunks: string[] = [];

  let start = 0;

  while (start < text.length) {
    const end = start + size;
    const chunk = text.slice(start, end).trim();

    if (chunk.length > 0) {
      chunks.push(chunk);
    }

    // move forward but keep overlap
    start = end - overlap;
    if (start < 0) start = 0;
  }

  return chunks;
}

// 100 - 500
// 400 - 900
