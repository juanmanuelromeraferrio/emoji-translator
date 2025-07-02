import { getRecentEmojis } from "../../../lib/getRecentEmojis";

const handler = async (_req, res) => {
    try {
      // Set cache headers for recent emojis
      res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
      
      const recentEmojis = await getRecentEmojis();
      res.status(200).json({ recentEmojis });
    } catch (error) {
      res.status(500).json({ error: "Error fetching recent emojis" });
    }
  };

export default handler;