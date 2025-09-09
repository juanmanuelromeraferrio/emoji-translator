import React from 'react';
import styles from '../styles/EmojiGridSkeleton.module.css';

const EmojiGridSkeleton = React.memo(() => {
  return (
    <div className={styles.skeletonGrid}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.skeletonEmoji}></div>
            <div className={styles.skeletonWord}></div>
          </div>
        ))}
      </div>
    </div>
  );
});

EmojiGridSkeleton.displayName = 'EmojiGridSkeleton';

export default EmojiGridSkeleton;