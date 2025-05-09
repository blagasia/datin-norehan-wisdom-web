
export interface SEOMetadata {
  id: string;
  page_path: string;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
  created_at: string;
  updated_at: string;
}
