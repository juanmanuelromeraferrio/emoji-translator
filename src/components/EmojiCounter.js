import { useState, useEffect } from 'react';
import styles from "../styles/EmojiCounter.module.css";


const EmojiCounter = () => {
  const [emojiCount, setEmojiCount] = useState(0);

  useEffect(() => {
    fetch('/api/emojis/count')
      .then(response => response.json())
      .then(data => {
        setEmojiCount(data.count);
      })
      .catch(error => {
        console.error("Error fetching emoji count:", error);
      });
  }, []);

  return (
      <p className={styles.subtitle}>{emojiCount} translations generated and counting!</p>
  );
}

export default EmojiCounter;
