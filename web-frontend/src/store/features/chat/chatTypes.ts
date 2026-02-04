export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
}

export interface ChatSource {
  id: number;
  title: string;
  url: string;
  similarity: number;
}

export interface ChatResponse {
  message: string;
  sources: ChatSource[];
  hasContext: boolean;
}

export interface SendMessagePayload {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatState {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sources: ChatSource[];
}
