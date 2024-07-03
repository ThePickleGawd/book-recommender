export interface BookData {
  title: string;
  author: string;
  isbn: string;
  imageURL: string;
}

export const mock_books_data: BookData[] = [
  {
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "9780735211292",
    imageURL:
      "https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "The Lean Startup",
    author: "Eric Ries",
    isbn: "9780307887894",
    imageURL: "https://m.media-amazon.com/images/I/81-QB7nDh4L._AC_UY218_.jpg",
  },
  {
    title: "Zero to One",
    author: "Peter Thiel",
    isbn: "9780804139298",
    imageURL: "https://m.media-amazon.com/images/I/71uAI28kJuL._AC_UY218_.jpg",
  },
  {
    title: "I Will Teach You to Be Rich",
    author: "Ramit Sethi",
    isbn: "9780761147480",
    imageURL:
      "https://m.media-amazon.com/images/I/81c9SSbG3OL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    isbn: "9780062273208",
    imageURL:
      "https://m.media-amazon.com/images/I/810u9MkT3SL._AC_UF1000,1000_QL80_.jpg",
  },
];
