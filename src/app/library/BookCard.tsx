"use client";

import { useState } from "react";
import Image from "next/image";
import { BookData } from "@/lib/book.types";
import { BookDetailsPopup } from "./BookDetailsPopup";
import CoverImageFallback from "@/components/books/CoverImageFallback";

export default function BookCard({ book }: { book: BookData }) {
  const { title, author, imageURL } = book;
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <>
      <div className="group flex aspect-[2/3] rounded-lg bg-neutral-300/70">
        <button
          className="relative h-full w-full transition group-hover:scale-110"
          onClick={() => setOpenPopup(true)}
        >
          <CoverImageFallback imageURL={imageURL} title={title} />
        </button>
      </div>
      {openPopup && (
        <BookDetailsPopup closePopup={() => setOpenPopup(false)} book={book} />
      )}
    </>
  );
}
