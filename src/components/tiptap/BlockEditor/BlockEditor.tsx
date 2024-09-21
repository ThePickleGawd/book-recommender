"use client";

import { EditorContent } from "@tiptap/react";
import React, { useEffect, useRef } from "react";

import { LinkMenu } from "@/components/menus";

import { useBlockEditor } from "@/hooks/useBlockEditor";

import "@/styles/index.css";

import { TableColumnMenu, TableRowMenu } from "@/extensions/Table/menus";
import { TextMenu } from "@/components/menus/TextMenu";
import { ContentItemMenu } from "@/components/menus/ContentItemMenu";
import * as Y from "yjs";

export const BlockEditor = ({ editable }: { editable: boolean }) => {
  const menuContainerRef = useRef(null);

  const { editor } = useBlockEditor();

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable);
    }
  }, [editor, editable]);

  if (!editor) {
    return null;
  }

  return (
    <div
      className={`flex h-full w-full rounded-md ${editable ? "bg-neutral-100" : ""}`}
      ref={menuContainerRef}
    >
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
