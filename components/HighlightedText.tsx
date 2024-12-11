import React from "react";

interface HighlightedTextProps {
  text: string;
  searchKeyword: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({
  text,
  searchKeyword,
}) => {
  if (!searchKeyword) return <span>{text}</span>;

  const regex = new RegExp(`(${searchKeyword})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === searchKeyword.toLowerCase() ? (
          <span key={index} className="bg-yellow-100">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
};

export default HighlightedText;
