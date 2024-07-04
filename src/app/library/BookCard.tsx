"use client";

import { useState } from "react";
import { StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { BookData } from "@/lib/book.types";
import { MockDatabase } from "@/util/mock-db";

export default function BookCard({ book }: { book: BookData }) {
  const { title, author, imageURL } = book;

  const [rating, setRating] = useState(book.personal_rating);
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (idx: number) => {
    setHoverRating(idx);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleStarClick = (idx: number) => {
    setRating(idx);

    const db = new MockDatabase();
    db.update(book.ol_key, {
      personal_rating: idx,
    });
    // TODO: save rating
  };

  const handleDelete = () => {
    const db = new MockDatabase();
    db.delete(book.ol_key);

    window.location.reload();
  };

  return (
    <div className="group relative flex space-x-4 rounded-lg p-4 hover:shadow-md">
      <div className="relative h-32 w-24">
        <Image fill src={imageURL} alt={title} />
      </div>

      <div className="flex flex-1 flex-col items-start py-2">
        <Link className="text-left" href="/books?isbn=1234">
          {title}
        </Link>
        <Link
          className="text-sm text-neutral-900"
          href="/authors?name=jamesclear"
        >
          {author}
        </Link>
        <div className="mt-2 flex">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              onMouseEnter={() => handleMouseEnter(val)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleStarClick(val)}
              className={`size-4`}
              aria-label={`Rate this book ${val} stars`}
            >
              <StarIcon
                className={`${val <= (hoverRating || rating) ? "fill-current" : ""}`}
              />
            </button>
          ))}
        </div>
      </div>
      <button
        className="absolute right-4 top-4 hidden rounded-full bg-orange-100/95 p-1 group-hover:block"
        onClick={handleDelete}
      >
        <TrashIcon className="size-5 text-red-500 hover:text-red-700" />
      </button>
    </div>
  );
}
