import getEmoji from "../../lib/getEmoji";
import saveEmoji from "../../lib/saveEmoji";
import getEmojiFromChatGPT from "../../lib/getEmojiFromChatGPT";


export default async (req, res) => {
  const { word } = req.query;
  let emoji = await getEmoji(word);

  if (!emoji) {
    // If emoji is not found in Prisma, search in ChatGPT API
    emoji = await getEmojiFromChatGPT(word);
    if (emoji) {
      await saveEmoji(word, emoji, "ChatGPT");
    }
  }

  if (emoji) {
    res.status(200).json({ emoji });
  } else {
    res.status(404).json({ error: `No emoji found for word "${word}"` });
  }
};
