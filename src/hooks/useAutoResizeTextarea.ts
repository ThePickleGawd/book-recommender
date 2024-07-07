import { useEffect, useRef } from "react";

export default function useAutoResizeTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const adjustHeight = () => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      textarea.style.height = "auto"; // Reset height to recompute from scroll height
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const textarea = textareaRef.current;
    if (!textarea) return;

    // Adjust height on mount and updates
    adjustHeight();

    // Add event listeners
    textarea.addEventListener("input", adjustHeight);

    // Clean up event listeners
    return () => {
      textarea.removeEventListener("input", adjustHeight);
    };
  }, []);

  return textareaRef;
}
