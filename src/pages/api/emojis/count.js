import { getEmojisCount } from "../../../lib/getEmojisCount";

const handler = async (req, res) => {
    try {
      const count = await getEmojisCount();
      res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ error: "Error fetching emoji count" });
    }
  };

export default handler;