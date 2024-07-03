"use client";

import { BookData } from "@/util/mock-data";
import {
  BookOpenIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export default function BookRecommendation({
  className,
  book,
}: {
  className?: string;
  book: BookData;
}) {
  const { title, author, imageURL, isbn } = book;

  return (
    <div
      className={`px-2 ${className} flex items-center justify-center overflow-clip`}
    >
      <div className="flex h-full w-[512px] flex-col rounded-lg bg-orange-200/40 px-4 py-4 shadow-md sm:p-12 sm:py-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{title}</div>
            <div className="text-neutral-600">{author}</div>
          </div>
          <Image width={96} height={128} src={imageURL} alt={title} />
        </div>

        <div className="mt-16 flex flex-col space-y-8">
          <div>
            <div className="font-bold">Summary: </div>
            <div>
              This is a summary of the book. It is pretty short so that is nice,
              but at the same time, it is informative so you can get the gist of
              the book without having to buy it just yet. Will you save it?
            </div>
          </div>
          <div>
            <div className="font-bold">Preview: </div>
            <div>
              Atomic Habits is a book that is really cool because it shows you
              how to become the best version of yourself by creating small
              changes in your lifestyle. Did you know 1% improvement everyday
              will make you 37x better in a year?
            </div>
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex justify-end space-x-3 py-2">
          <button className="rounded-lg p-1 text-neutral-800 hover:bg-neutral-400/80">
            <BookOpenIcon className="size-8" />
          </button>
          <button className="rounded-lg p-1 text-neutral-800 hover:bg-neutral-400/80">
            <HandThumbDownIcon className="size-8" />
          </button>
          <button className="rounded-lg p-1 text-neutral-800 hover:bg-neutral-400/80">
            <HandThumbUpIcon className="size-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
