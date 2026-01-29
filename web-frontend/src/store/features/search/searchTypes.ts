import type { Content } from "../content/contentTypes";

export interface SearchContentPayload {
  query: string;
  limit?: number;
}

export interface SearchResult {
  content: Content;
  contentId: string;
  similarity: number;
}

export interface SearchResponse {
  query: string;
  total: number;
  finalResult: SearchResult[];
}

export interface SearchContentState {
  results: SearchResult[];
  query: string;
  loading: boolean;
  error: string | null;
  total: number;
}
