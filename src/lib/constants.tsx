export const askAIPrompt = (bookTitle: string) => {
  return `https://chatgpt.com/?q=${encodeURIComponent(`Fill out a book summary for ${bookTitle} using concise wording, such that the reader can quickly glance and remember what they've already read. Your output is to be copied into a rich text editor. There are four h1 headers: Motivations, Lessons, Applications, and Quotes. Motivations should be a quick sentence or two, while the rest are in bullet point format.`)}`;
};

export const bookDetailsDefaultContent = `
            <h1>Motivations</h1>
            <p>Write something here...</p>
            <h1>Lessons</h1>
            <p>Write something here...</p>
            <h1>Applications</h1>
            <p>Write something here...</p>
            <h1>Quotes</h1>
            <p>Write something here...</p>
            `;

export const userColors = [
  "#fb7185",
  "#fdba74",
  "#d9f99d",
  "#a7f3d0",
  "#a5f3fc",
  "#a5b4fc",
  "#f0abfc",
];

export const themeColors = [
  "#fb7185",
  "#fdba74",
  "#d9f99d",
  "#a7f3d0",
  "#a5f3fc",
  "#a5b4fc",
];
