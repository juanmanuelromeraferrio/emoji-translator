import { getRecentEmojis } from "../../../lib/getRecentEmojis";

export default async (req, res) => {
    try {
      const recentEmojis = await getRecentEmojis();
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      res.status(200).json({ recentEmojis });
    } catch (error) {
      res.status(500).json({ error: "Error fetching recent emojis" });
    }
  };