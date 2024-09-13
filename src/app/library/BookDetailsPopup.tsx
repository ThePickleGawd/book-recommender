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
import { MockDatabase } from "@/util/mock-db";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";
import CoverImageFallback from "@/components/CoverImageFallback";

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
          <div className="text-3xl font-bold">Overview</div>
          <br />
          <div className="text-xl font-bold">Motivation</div>
          <div className="text-neutral-700">
            System 1 operates automatically and quickly, with little or no
            effort and no sense of voluntary control. System 2 allocates
            attention to the effortful mental activities that demand it,
            including complex computations. The operations of System 2 are often
            associated with the subjective experience of agency, choice, and
            concentration. I describe System 1 as effortlessly originating
            impressions and feelings that are the main sources of the explicit
            beliefs and deliberate choices of System 2. The automatic operations
            of System 1 generate surprisingly complex patterns of ideas, but
            only the slower System 2 can construct thoughts in an orderly series
            of steps.
          </div>
          <br />
          <div className="text-xl font-bold">Lessons</div>
          <div className="text-neutral-700">
            People, when engaged in a mental sprint, become effectively blind.
            As you become skilled in a task, its demand for energy diminishes.
            Talent has similar effects. One of the significant discoveries of
            cognitive psychologists in recent decades is that switching from one
            task to another is effortful, especially under time pressure.
          </div>
          <br />
          <div className="text-xl font-bold">Application</div>
          <div className="text-neutral-700">
            It is now a well-established proposition that both self-control and
            cognitive effort are forms of mental work. Several psychological
            studies have shown that people who are simultaneously challenged by
            a demanding cognitive task and by a temptation are more likely to
            yield to the temptation. People who are cognitively busy are also
            more likely to make selfish choices, use sexist language, and make
            superficial judgments in social situations. A few drinks have the
            same effect, as does a sleepless night.
          </div>
          <br />
          <div className="text-3xl font-bold">Chapter Summary</div>
          <div>
            TODO: Add collapsable sections with each chapter; generally they
            have bullet points at the end
          </div>
        </div>
      </div>
    </div>
  );
};
