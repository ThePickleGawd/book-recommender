"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState, MouseEvent } from "react";

export default function AddBookPopup() {
  const [open, setOpen] = useState(false);

  // Close modal only on clicks outside the card
  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        className="group mx-4 my-2 flex items-center justify-center rounded-lg border-2 border-neutral-400/40 p-4 hover:border-neutral-400/80"
        onClick={() => setOpen(true)}
      >
        <PlusCircleIcon className="size-12 text-neutral-400/40 group-hover:text-neutral-400/80" />
      </button>
      {open && (
        <div
          className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center bg-black/40"
          onClick={handleClose}
        >
          <div className="flex h-2/3 w-1/2 flex-col rounded-lg bg-white p-8 shadow-md">
            <input
              className="w-full rounded-lg bg-neutral-200 p-4 focus:outline-neutral-300"
              placeholder="Search title, author, isbn..."
            />
            <div className="mt-4">All Results</div>
            <div className="mt-2 flex flex-col space-y-2">
              {[1, 2, 3, 4].map((idx) => (
                <div key={idx} className="w-full rounded-lg bg-gray-200 p-4">
                  HEYY
                </div>
              ))}
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
