import type { Content } from "../content/contentTypes";

export interface ShareLink {
  hash: string;
  userId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SharedContent {
  user: {
    userName: string;
  };
  contents: Content[];
}

export interface ShareState {
  shareLink: ShareLink | null;
  sharedContent: SharedContent | null;
  loading: boolean;
  error: string | null;
}

export interface GenerateShareLinkResponse {
  hash: string;
  shareUrl: string;
}

export interface ToggleSharePayload {
  isActive: boolean;
}
