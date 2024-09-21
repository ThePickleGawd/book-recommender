export const askAIPrompt = (bookTitle: string) => {
  return `https://chatgpt.com/?q=${encodeURIComponent(`Fill out a book summary for ${bookTitle} using concise wording, such that the reader can quickly glance and remember what they've already read. Your output is to be copied into a rich text editor. There are four h1 headers: Motivations, Lessons, Applications, and Quotes. Motivations should be a quick sentence or two, while the rest are in bullet point format.`)}`;
};
