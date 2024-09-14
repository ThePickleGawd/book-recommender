"use client";

import { EditorContent } from "@tiptap/react";
import React, { useRef } from "react";

import { LinkMenu } from "@/components/menus";

import { useBlockEditor } from "@/hooks/useBlockEditor";

import "@/styles/index.css";

import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import { EditorHeader } from "./components/EditorHeader";
import { TextMenu } from "@/components/menus/TextMenu";
import { ContentItemMenu } from "@/components/menus/ContentItemMenu";
import * as Y from "yjs";

export const BlockEditor = () => {
  const menuContainerRef = useRef(null);

  const { editor } = useBlockEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex h-full flex-1 flex-col overflow-hidden">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
};

export default BlockEditor;
