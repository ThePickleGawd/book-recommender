"use client";

import { PlusCircleIcon, StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import BookCard from "./BookCard";
import { useMockDatabase } from "@/util/mock-data";
import AddBookPopup from "./AddBookPopup";
import { useEffect, useState } from "react";
import { MockDatabase } from "@/util/mock-db";
import { OLBookData } from "@/lib/open-library.types";

export default function LibraryPage() {
  const bookDataArr = useMockDatabase(); // TODO: implement this with the database instead

  return (
    <div className="flex flex-col items-center justify-center pt-8 xl:pt-16">
      <div className="flex w-full flex-col items-center justify-center px-4 sm:w-2/3 xl:px-8">
        <div className="w-full">
          <div className="text-4xl font-bold">My Library</div>
          <div className="text-lg">Your personal collection of books.</div>
        </div>
        <div className="mt-8 grid w-full auto-rows-fr grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          {bookDataArr.map((book) => (
            <BookCard key={book.title} book={book} />
          ))}
          <AddBookPopup />
        </div>
      </div>
    </div>
  );
}
