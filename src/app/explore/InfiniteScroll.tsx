import { useRef } from "react";
import BookRecommendation from "./BookRecommendation";
import { mock_books_data } from "@/util/mock-data";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL!;

async function getBookData() {
  // load book suggestions from database
}

export default async function InfiniteScroll() {
  return (
    <div className="no-scrollbar h-screen-no-navbar snap-y snap-mandatory overflow-y-scroll">
      {mock_books_data.map((book, idx) => (
        <BookRecommendation
          key={idx}
          book={book}
          className="my-2 h-[95%] snap-start"
        />
      ))}
    </div>
  );
}
