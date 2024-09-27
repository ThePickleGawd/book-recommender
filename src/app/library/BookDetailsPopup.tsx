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
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { askAIPrompt } from "@/lib/constants";

export const BookDetailsPopup = ({
  closePopup,
  book,
}: {
  closePopup: () => void;
  book: BookData;
}) => {
  const { title, author, summary, personal_notes, imageURL, ol_key } = book;

  const [rating, setRating] = useState(book.personal_rating);
  const [hoverRating, setHoverRating] = useState(0);
  const [summaryEditable, setSummaryEditable] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const saveBookDetails = () => {
    const db = new MockDatabase();
    db.update(ol_key, { personal_notes: editorContent });
    setSummaryEditable(false);

    // TODO: I need to refresh the parent book, not the whole page
    window.location.reload();
  };

  const handleDelete = () => {
    const db = new MockDatabase();
    db.delete(ol_key);

    window.location.reload();
  };

  // Close modal only on clicks outside the card
  const handleCloseIfOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

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

  const handleAskAI = () => {
    window.open(askAIPrompt(title), "_blank");
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
          <div className="flex-1" />
          <div>
            <button
              className="rounded-full p-1 hover:bg-red-200"
              onClick={handleDelete}
            >
              <TrashIcon className="size-5 text-red-500" />
            </button>
          </div>
        </div>
        <div className="mt-12">
          <div className="mb-2 flex space-x-2">
            <div className="flex-1" />
            <Button variant="secondary" onClick={handleAskAI}>
              Ask AI ✨
            </Button>
            <div>
              {summaryEditable ? (
                <Button
                  onClick={saveBookDetails}
                  className="border-none bg-green-500 hover:bg-green-600"
                  variant="primary"
                >
                  Confirm
                  <Icon name="Check" />
                </Button>
              ) : (
                <Button onClick={() => setSummaryEditable(true)}>
                  Edit
                  <Icon name="Pencil" />
                </Button>
              )}
            </div>
          </div>
          <BlockEditor
            editable={summaryEditable}
            initialContent={personal_notes}
            contentCb={setEditorContent}
          />
        </div>
      </div>
    </div>
  );
};
