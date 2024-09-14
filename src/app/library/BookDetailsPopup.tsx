"use client";

import { useState, MouseEvent, useEffect, ChangeEvent } from "react";
import {
  StarIcon,
  TrashIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { BookData } from "@/lib/book.types";
import { MockDatabase } from "@/lib/utils/mock-db";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";
import CoverImageFallback from "@/components/CoverImageFallback";
import { BlockEditor } from "@/components/tiptap/BlockEditor";

export const BookDetailsPopup = ({
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

  const [rating, setRating] = useState(book.personal_rating);
  const [hoverRating, setHoverRating] = useState(0);
  const [summaryEditable, setSummaryEditable] = useState(false);

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
  };

  return (
    <div
      className="w-dvh fixed inset-0 z-10 flex h-dvh items-center justify-center bg-black/40"
      onMouseDown={handleCloseIfOutside}
    >
      <div className="m-4 h-3/4 w-full max-w-[1000px] overflow-y-scroll rounded-lg bg-white p-6 md:m-24 md:p-10">
        <div className="flex space-x-6">
          <div className="relative aspect-[2/3] w-28">
            <CoverImageFallback imageURL={imageURL} title={title} />
          </div>
          <div className="flex flex-col">
            <div className="text-3xl font-black">{title}</div>
            <div className="text text-lg font-normal text-neutral-700">
              {author}
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onMouseEnter={() => handleMouseEnter(val)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleStarClick(val)}
                  className={`size-6 text-orange-600`}
                  aria-label={`Rate this book ${val} stars`}
                >
                  <StarIcon
                    className={`${val <= (hoverRating || rating) ? "fill-current" : ""}`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="mb-2 flex">
            <div className="flex-1" />
            <div>
              {summaryEditable ? (
                <button
                  className="rounded-lg bg-neutral-100 px-4 py-1"
                  onClick={() => setSummaryEditable(false)}
                >
                  Confirm
                </button>
              ) : (
                <button
                  className="rounded-lg bg-neutral-100 px-4 py-1"
                  onClick={() => setSummaryEditable(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
          <BlockEditor editable={summaryEditable} />
        </div>
      </div>
    </div>
  );
};
