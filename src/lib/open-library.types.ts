/* DIRECT QUERIES */

// https://openlibrary.org/work/{book_key}.json
export interface OLBookData {
  title: string;
  authors: [
    {
      author: {
        key: string; // ex. "/authors/OL7422948A"
      };
      type: {
        key: string; // ex. "/type/author_role"
      };
    },
  ];
  isbn: string;
  covers: string[];
  key: string; // ex. "/works/OL17930368W"
}

export interface OLAuthorData {
  name: string;
}

/* SEARCH RESULTS */

export interface OLBookSearchResult {
  title: string;
  key: string;
  author_name?: string[];
  isbn?: string[];
  cover_i?: string; // Use to fetch cover image
  ratings_average?: string;
}

export interface OLSearchApiResponse {
  docs: OLBookSearchResult[];
}
