import { useRef } from "react";
import BookRecommendation from "./BookRecommendation";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL!;

async function getBookData() {
  // load book suggestions from database
}

export default async function InfiniteScroll() {
  return (
    <div className="flexsnap-y no-scrollbar h-screen snap-y snap-mandatory overflow-y-scroll bg-orange-100">
      {[1, 2, 3, 4, 5].map((x, index) => (
        <BookRecommendation key={x} className="flex-1 snap-start" />
      ))}
    </div>
  );
}
