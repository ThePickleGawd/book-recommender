"use client";

import { useRef } from "react";
import BookRecommendation from "./BookRecommendation";
import { useMockDatabase } from "@/util/mock-data";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL!;

export default function InfiniteScroll() {
  const bookDataArr = useMockDatabase();

  return (
    <div className="no-scrollbar h-screen-no-navbar snap-y snap-mandatory overflow-y-scroll">
      {bookDataArr.map((book) => (
        <BookRecommendation
          key={book.ol_key}
          book={book}
          className="my-2 h-[95%] snap-start"
        />
      ))}
    </div>
  );
}
