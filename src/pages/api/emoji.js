import getEmoji from "../../lib/getEmoji";


export default async (req, res) => {
  const { word } = req.query;
  const emoji = await getEmoji(word);
  if (emoji) {
    res.status(200).json({ emoji });
  } else {
    res.status(404).json({ error: `No emoji found for word "${word}"` });
  }
};
