"use client";

import { BookData } from "@/lib/book.types";
import { OLAuthorData, OLBookData } from "@/lib/open-library.types";
import { MockDatabase } from "@/lib/utils/mock-db";
import { useEffect, useState } from "react";
import { bookDetailsDefaultContent } from "../constants";

export const mock_books_data: string[] = [
  "/works/OL17930368W", // Atomic Habits
  "/works/OL20618767W", // The Learn Startup
  "/works/OL17078706W", // Zero to One
  "/works/OL8982032W", // I Will Teach You To Be Rich
  "/works/OL16818208W", // The Hard Thing About Hard Things
];
export const addBookFromOLKey = async (db: MockDatabase, ol_key: string) => {
  const bookDataRes = await fetch(`https://openlibrary.org${ol_key}.json`);
  const bookData = await bookDataRes.json();

  console.log(bookData);

  const authorDataRes = await fetch(
    `https://openlibrary.org${bookData.authors[0].author.key}.json`,
  );
  const authorData = await authorDataRes.json();

  db.create({
    title: bookData.title,
    author: authorData.name,
    imageURL: bookData.covers
      ? `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-M.jpg`
      : "",
    ol_key: ol_key,
    personal_notes: bookDetailsDefaultContent,
    personal_rating: 5,
    summary: "",
  });
};

export function useMockDatabase(): BookData[] {
  const [bookData, setBookData] = useState<BookData[]>([]);

  useEffect(() => {
    const db = new MockDatabase();
    const initBooks = async () => {
      if (db.empty()) {
        for (const ol_key of mock_books_data) {
          await addBookFromOLKey(db, ol_key);
        }
      }
      setBookData(db.getAll());
    };

    initBooks();

    return () => {
      // Cleanup logic if necessary
    };
  }, []);

  return bookData;
}
