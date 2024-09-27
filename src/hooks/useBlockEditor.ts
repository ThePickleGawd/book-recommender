"use client";

import { useEditor, useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import { ExtensionKit } from "@/extensions/extension-kit";
import History from "@tiptap/extension-history";
import { useState } from "react";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({
  initialContent,
}: {
  initialContent: string;
}) => {
  const [content, setContent] = useState("");

  const editor = useEditor({
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    autofocus: true,
    onCreate: (ctx) => {
      ctx.editor.commands.setContent(initialContent);
      ctx.editor.commands.focus("start", { scrollIntoView: true });
    },
    onUpdate: (ctx) => {
      setContent(ctx.editor.getHTML());
    },
    extensions: [History, ...ExtensionKit()],
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: "min-h-full",
      },
    },
  });
  window.editor = editor;

  return { editor, content };
};

export default useBlockEditor;
