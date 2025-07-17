export const HighlightKeywords = (text, keywords) => {
  const regex = new RegExp(`(${keywords.join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    keywords.some((keyword) => part.toLowerCase() === keyword.toLowerCase()) ? (
      <span key={index} className="text-[#2A3BFF] font-medium">
        {part}
      </span>
    ) : (
      <span key={index}>{part}</span>
    )
  );
};