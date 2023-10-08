import { getEmojisCount } from "../../../lib/getEmojisCount";

export default async (req, res) => {
    try {
      const count = await getEmojisCount();
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ error: "Error fetching emoji count" });
    }
  };