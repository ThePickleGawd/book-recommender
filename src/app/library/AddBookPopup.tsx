"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import Image from "next/image";
import {
  OLBookSearchResult,
  OLSearchApiResponse,
} from "@/lib/open-library.types";
import { addBookFromOLKey } from "@/util/mock-data";
import { MockDatabase } from "@/util/mock-db";

export default function AddBookPopup() {
  // UI State
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Search State
  const [results, setResults] = useState<OLBookSearchResult[]>([]);
  const [selectedBook, setSelectedBook] = useState<OLBookSearchResult>();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (input) {
        searchBooks(input);
      }
    }, 300); // Delay in milliseconds

    return () => clearTimeout(timeoutId);
  }, [input]);

  // Close modal only on clicks outside the card
  const handleCloseIfOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddSelectedBook = async () => {
    if (!selectedBook) return;
    await addBookFromOLKey(new MockDatabase(), selectedBook.key);
    window.location.reload();
  };

  const searchBooks = async (query: string) => {
    setIsLoading(true);
    setSelectedBook(undefined);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=${10}&lang=en`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: OLSearchApiResponse = await response.json();
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
        className="group flex aspect-[2/3] items-center justify-center rounded-lg border-2 border-neutral-500/40 hover:border-green-500/80"
        onClick={() => setOpen(true)}
      >
        <PlusCircleIcon className="size-12 text-neutral-500/40 group-hover:text-green-500/80" />
      </button>
      {open && (
        <div
          className="w-dvh fixed inset-0 z-10 flex h-dvh items-center justify-center bg-black/40"
          onMouseDown={handleCloseIfOutside}
        >
          <div className="mx-2 flex h-4/5 w-full flex-col rounded-lg bg-white p-4 shadow-md md:mx-0 md:w-2/3 lg:h-2/3 lg:w-1/2">
            <input
              className="w-full rounded-lg bg-neutral-200 p-4 focus:outline-none"
              placeholder="Search title, author, isbn..."
              onChange={handleInputChange}
            />
            <div className="no-scrollbar mt-4 overflow-y-scroll">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="flex flex-col space-y-2">
                  <div className="">
                    {results.length === 0 ? "No results found" : "Top Results"}
                  </div>
                  {results.map((book, idx) => (
                    <button
                      key={idx}
                      className={`flex w-full items-center space-x-4 rounded-lg p-4 text-left ${selectedBook == book ? "bg-blue-100" : ""} `}
                      onClick={() => setSelectedBook(book)}
                    >
                      <div className="relative h-32 w-24">
                        <Image
                          src={
                            book.cover_i
                              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                              : "/images/book-default-cover.jpg"
                          }
                          alt={book.title}
                          fill
                        />
                      </div>
                      <div className="h-full flex-1 overflow-hidden">
                        <div className="text-lg">{book.title}</div>
                        <div>{book.author_name?.join(", ")}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1" />
            <div className="mt-2 flex w-full items-end space-x-4">
              <a
                href="https://openlibrary.org"
                className="text-xs hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Powered by Open Library
              </a>
              <div className="flex-1" />
              <button
                className="rounded-lg px-8 py-2 font-bold text-red-500"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-blue-200 px-8 py-2 font-bold text-blue-500 disabled:bg-neutral-300 disabled:text-neutral-600"
                disabled={selectedBook === undefined}
                onClick={handleAddSelectedBook}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
