"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import Image from "next/image";
import { BookSearchResult, SearchApiResponse } from "@/lib/open-library.types";

export default function AddBookPopup() {
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [results, setResults] = useState<BookSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (input) {
        searchBooks(input);
      }
    }, 300); // Delay in milliseconds

    return () => clearTimeout(timeoutId);
  }, [input]);

  // Close modal only on clicks outside the card
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const searchBooks = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${10}&lang=en`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: SearchApiResponse = await response.json();
      console.log(data);
      setResults(data.docs);
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching books:", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="min-h-300 group mx-4 my-2 flex items-center justify-center rounded-lg border-2 border-neutral-400/40 p-4 hover:border-neutral-400/80"
        onClick={() => setOpen(true)}
      >
        <PlusCircleIcon className="size-12 text-neutral-400/40 group-hover:text-neutral-400/80" />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black/40"
          onClick={handleClose}
        >
          <div className="mx-2 flex h-3/4 w-full flex-col rounded-lg bg-white p-8 shadow-md md:mx-0 md:h-2/3 md:w-2/3 lg:w-1/2">
            <input
              className="w-full rounded-lg bg-neutral-200 p-4 focus:outline-neutral-300"
              placeholder="Search title, author, isbn..."
              onChange={handleInputChange}
            />
            <div className="mt-4">Top Results</div>
            <div className="mt-2 overflow-y-scroll">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <ul className="flex flex-col space-y-2">
                  {results.map((book, idx) => (
                    <li
                      key={idx}
                      className="flex w-full items-center space-x-4 rounded-lg bg-gray-100 p-4"
                    >
                      <div className="relative h-32 w-24">
                        <Image
                          src={
                            book.cover_i
                              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                              : "/images/book-default-cover.jpg"
                          }
                          alt={book.title}
                          layout="fill"
                          objectFit="fill" // This will crop the image to fill the container
                        />
                      </div>
                      <div className="h-full flex-1 overflow-hidden">
                        <div className="text-lg">{book.title}</div>
                        <div>{book.author_name?.join(", ")}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex-1" />
            <div className="flex w-full justify-end space-x-4">
              <button
                className="rounded-lg px-8 py-2 font-bold text-red-800"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button className="rounded-lg bg-blue-200 px-8 py-2 font-bold text-blue-600">
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
