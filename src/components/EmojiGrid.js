import React, { useRef, useEffect } from 'react';
import styles from '../styles/EmojiGrid.module.css';
import EmojiCard from './EmojiCard';

const MAX_EMOJIS_TO_DISPLAY = 40;

function EmojiGrid({ emojis, addEmojis }) {
  const hasBeenInitialized = useRef(false);

  useEffect(() => {
    async function fetchDefaultEmojis() {
      try {
        const response = await fetch('/api/emojis/recents');
        const data = await response.json();

        addEmojis(data.recentEmojis);

      } catch (error) {
        console.error('Error fetching recent emojis:', error);
      }
    }
    if (!hasBeenInitialized.current) {
      fetchDefaultEmojis();
      hasBeenInitialized.current = true;
    }
  }, []);

  return (
    <div className={styles.emojiGrid}>
      <h4>Recent Translations</h4>
      <div className={styles.grid}>
        {emojis.slice(0, MAX_EMOJIS_TO_DISPLAY).map((emojiObj, index) => (
          <EmojiCard key={index} emoji={emojiObj.emoji} word={emojiObj.word} />
        ))}
      </div>
    </div>
  );
}

export default EmojiGrid;