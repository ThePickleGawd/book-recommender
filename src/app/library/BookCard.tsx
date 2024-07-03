"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { BookData } from "@/util/mock-data";
import Image from "next/image";

export default function BookCard({ book }: { book: BookData }) {
  const { title, author, isbn, imageURL } = book;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (idx: number) => {
    setHoverRating(idx);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (idx: number) => {
    setRating(idx);

    // TODO: save rating
  };

  return (
    <button className="flex space-x-4 truncate rounded-lg p-4 hover:shadow-md">
      <Image width={96} height={128} src={imageURL} alt={title} />
      <div className="flex flex-col items-start py-2">
        <Link className="w-64 text-left" href="/books?isbn=1234">
          {title}
        </Link>
        <Link
          className="text-sm text-neutral-900"
          href="/authors?name=jamesclear"
        >
          {author}
        </Link>
        <div className="mt-2 flex">
          {[1, 2, 3, 4, 5].map((index) => (
            <button
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(index)}
              className={`size-4`}
              aria-label={`Rate this book ${index} stars`}
            >
              <StarIcon
                className={`${index <= (hoverRating || rating) ? "fill-current" : ""}`}
              />
            </button>
          ))}
        </div>
      </div>
    </button>
  );
}
