import React from "react";

interface HighlightedTextProps {
  text: string;
  query: string;
  className?: string;
}

/**
 * Component to highlight matched text within a string.
 * Case-insensitive for matching but preserves original casing in output.
 * Escapes special characters in query to prevent regex errors.
 */
export const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  query,
  className = "",
}) => {
  if (!query.trim()) return <span className={className}>{text}</span>;

  // Escape special regex characters
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escapedQuery})`, "gi"));

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-primary/30 text-foreground rounded-sm px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
};
