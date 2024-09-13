"use client";

import { useEditor, EditorContent, ReactRenderer } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import tippy from "tippy.js";
import { useEffect, useState } from "react";
import {
  BoldIcon,
  ItalicIcon,
  ListBulletIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const TiptapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [2] }),
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
    ],
    content: `
      <h2>Motivations</h2>
      <p></p>
      <h2>Lessons</h2>
      <p></p>
      <h2>Applications</h2>
      <p></p>
      <h2>Quotes</h2>
      <p></p>
    `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="popup-card rounded-lg bg-white p-4 shadow-lg">
      <div className="editor-toolbar mb-4 flex space-x-2 border-b">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded p-2 ${
            editor.isActive("bold")
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          <BoldIcon className="h-5 w-5" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded p-2 ${
            editor.isActive("italic")
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100"
          }`}
        >
          <ItalicIcon className="h-5 w-5" />
        </button>
        {/* Add more toolbar buttons as needed */}
      </div>
      <EditorContent editor={editor} className="prose prose-lg max-w-none" />
    </div>
  );
};

export default TiptapEditor;
