import getEmojis from "../../lib/getEmojis";
import saveEmoji from "../../lib/saveEmoji";
import getEmojisFromChatGPT from "../../lib/getEmojisFromChatGPT";
import saveRecentTranslation from "@/lib/saveRecentTranslation";


const handler = async (req, res) => {
  const { word } = req.query;
  
  // Set cache headers for better performance
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    
  let emojis = await getEmojis(word);

  if (emojis && emojis.length < 10) {
    // If emoji is not found in Prisma, search in ChatGPT API
    emojis = await getEmojisFromChatGPT(word);
    if (emojis) {
      for (const emoji of emojis) {
        await saveEmoji(word, emoji, "ChatGPT");
      }
    }
  }

  if (emojis) {
    await saveRecentTranslation(word, emojis[0]);
  }

  if (emojis) {
    res.status(200).json({ emojis });
  } else {
    res.status(404).json({ error: `No emojis found for word "${word}"` });
  }
};

export default handler;
