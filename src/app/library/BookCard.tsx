"use client";

import {
  MouseEventHandler,
  useState,
  MouseEvent,
  useEffect,
  ChangeEvent,
} from "react";
import { StarIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { BookData } from "@/lib/book.types";
import { MockDatabase } from "@/util/mock-db";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";

export default function BookCard({ book }: { book: BookData }) {
  const { title, author, imageURL } = book;

  const [rating, setRating] = useState(book.personal_rating);
  const [hoverRating, setHoverRating] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);

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
    <>
      <div className="group relative flex space-x-4 rounded-lg p-4 hover:shadow-md">
        <button
          className="relative h-32 w-24"
          onClick={() => setOpenPopup(true)}
        >
          <Image fill src={imageURL} alt={title} />
        </button>

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
        <button
          className="absolute bottom-4 right-4 hidden rounded-lg bg-neutral-300 px-4 py-1 text-sm text-neutral-500 hover:bg-neutral-300/70 group-hover:block"
          onClick={() => setOpenPopup(true)}
        >
          View
        </button>
      </div>
      {openPopup && (
        <BookDetailsPopup closePopup={() => setOpenPopup(false)} book={book} />
      )}
    </>
  );
}

const BookDetailsPopup = ({
  closePopup,
  book,
}: {
  closePopup: () => void;
  book: BookData;
}) => {
  const { title, author, summary, personal_notes, imageURL, ol_key } = book;
  const summaryRef = useAutoResizeTextarea();
  const notesRef = useAutoResizeTextarea();

  const [summaryInput, setSummaryInput] = useState(summary);
  const [notesInput, setNotesInput] = useState(personal_notes);

  const saveBookDetails = () => {
    const db = new MockDatabase();
    db.update(ol_key, { summary: summaryInput, personal_notes: notesInput });
    window.location.reload();
    // TODO: I need to refresh the parent book, not the whole page
  };

  const handleSummaryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSummaryInput(e.target.value);
  };
  const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNotesInput(e.target.value);
  };

  // Close modal only on clicks outside the card
  const handleCloseIfOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <div
      className="w-dvh fixed inset-0 z-10 flex h-dvh items-center justify-center bg-black/40"
      onMouseDown={handleCloseIfOutside}
    >
      <div className="mx-2 flex h-3/4 w-full flex-col rounded-lg bg-white p-8 shadow-md md:mx-0 md:h-2/3 md:w-2/3 lg:w-1/2">
        <div className="overflow-y-scroll">
          <div className="flex space-x-4">
            <div>
              <div className="mt-0 text-xl font-bold">{title}</div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex flex-col">
              <div>Summary</div>
              <textarea
                ref={summaryRef}
                onChange={handleSummaryChange}
                value={summaryInput}
                placeholder="Write a summary here"
                className="w-full rounded-lg bg-neutral-200 p-4 focus:outline-neutral-300"
                rows={3}
              />
            </div>
            <div className="flex flex-col">
              <div>Personal Notes</div>
              <textarea
                ref={notesRef}
                onChange={handleNotesChange}
                value={notesInput}
                placeholder="Write your personal notes here"
                className="w-full rounded-lg bg-neutral-200 p-4 focus:outline-neutral-300"
                rows={6}
              />
            </div>
            <div className="h-16" />
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex w-full items-center space-x-4">
          <div className="flex-1" />

          <button
            className="rounded-lg px-8 py-2 font-bold text-red-800"
            onClick={closePopup}
          >
            Close
          </button>
          <button
            className="rounded-lg bg-blue-200 px-8 py-2 font-bold text-blue-600 disabled:bg-neutral-300 disabled:text-neutral-600"
            onClick={saveBookDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
