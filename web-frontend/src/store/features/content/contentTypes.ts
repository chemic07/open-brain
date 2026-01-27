export type ContentType = "video" | "image" | "article" | "tweet";

export interface Tag {
  _id: string;
  name: string;
  userId: string;
}

export interface Link {
  _id: string;
  url: string;
  title?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Content {
  _id: string;
  link: Link;
  type: ContentType;
  title: string;
  tags: Tag[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentState {
  contents: Content[];
  loading: boolean;
  error: string | null;
  currentContent: Content | null;
}

export interface AddContentPayload {
  link: string;
  type: ContentType;
  title: string;
  tags?: string[];
}
