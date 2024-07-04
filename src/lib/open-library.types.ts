export interface BookSearchResult {
  title: string;
  author_name?: string[];
  isbn?: string[];
  cover_i?: string; // Use to fetch cover image
}

export interface SearchApiResponse {
  docs: BookSearchResult[];
}
