import React from 'react';
import styles from '../styles/SkeletonLoader.module.css';

const SkeletonLoader = React.memo(() => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonEmoji}></div>
      <div className={styles.skeletonButtons}>
        <div className={styles.skeletonButton}></div>
        <div className={styles.skeletonButton}></div>
      </div>
    </div>
  );
});

SkeletonLoader.displayName = 'SkeletonLoader';

export default SkeletonLoader;