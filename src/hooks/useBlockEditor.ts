import { useEditor, useEditorState } from "@tiptap/react";
import type { Editor } from "@tiptap/core";
import { ExtensionKit } from "@/extensions/extension-kit";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = () => {
  const editor = useEditor({
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
    autofocus: true,
    onCreate: (ctx) => {
      if (ctx.editor.isEmpty) {
        ctx.editor.commands.setContent(`
            <h1>Motivations</h1>
            <p>Write something here...</p>
            <h1>Lessons</h1>
            <p>Write something here...</p>
            <h1>Applications</h1>
            <p>Write something here...</p>
            <h1>Quotes</h1>
            <p>Write something here...</p>
            `);
        ctx.editor.commands.focus("start", { scrollIntoView: true });
      }
    },
    extensions: [...ExtensionKit()],
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

  return { editor };
};

export default useBlockEditor;
