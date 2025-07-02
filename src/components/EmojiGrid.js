import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import styles from '../styles/EmojiGrid.module.css';
import EmojiCard from './EmojiCard';
import EmojiGridSkeleton from './EmojiGridSkeleton';

const MAX_EMOJIS_TO_DISPLAY = 40;

const EmojiGrid = forwardRef((_props, ref) => {
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(true);

  useImperativeHandle(ref, () => ({
    addTranslation: (emoji, word) => {
      setEmojis(prevEmojis => [{ emoji, word }, ...prevEmojis]);
    }
  }));

  useEffect(() => {
    async function fetchEmojis() {
      try {
        const response = await fetch('/api/emojis/recents');
        const data = await response.json();
        setEmojis(data.recentEmojis || []);
      } catch (error) {
        console.error('Error fetching recent emojis:', error);
        setEmojis([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEmojis();
  }, []);

  if (loading) {
    return <EmojiGridSkeleton />;
  }

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
});

EmojiGrid.displayName = 'EmojiGrid';

export default EmojiGrid;