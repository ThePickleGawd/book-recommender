"use client";

import {
  BookOpenIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/solid";

export default function BookRecommendation({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={`h-screen px-4 py-4 ${className} flex items-center justify-center`}
    >
      <div className="bg-neutral-600/10 w-[512px] h-full rounded-lg px-16 py-8 flex flex-col">
        <div className="flex w-full items-center justify-between ">
          <div className="flex flex-col">
            <div className="text-2xl font-bold">Atomic Habits</div>
            <div className="text-neutral-600">James Clear</div>
          </div>
          <div className="w-20 h-24 bg-white rounded-lg" />
        </div>

        <div className="flex flex-col space-y-8 mt-16">
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
        <div className="py-2 flex justify-end space-x-3">
          <button className="p-1 rounded-lg hover:bg-neutral-400/80 text-neutral-800">
            <BookOpenIcon className="size-8" />
          </button>
          <button className="p-1 rounded-lg hover:bg-neutral-400/80 text-neutral-800">
            <HandThumbDownIcon className="size-8" />
          </button>
          <button className="p-1 rounded-lg hover:bg-neutral-400/80 text-neutral-800">
            <HandThumbUpIcon className="size-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
