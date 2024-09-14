import { BlockEditor } from "@/components/tiptap/BlockEditor";
import React from "react";

const Page: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[1000px]">
        <BlockEditor />
      </div>
    </div>
  );
};

export default Page;
