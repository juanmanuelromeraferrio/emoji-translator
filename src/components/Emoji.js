import React, { useState, useEffect } from "react";
import { FaCopy, FaCheck, FaRedo } from 'react-icons/fa';
import styles from "../styles/Emoji.module.css";
import { motion } from 'framer-motion';

const Emoji = ({ emojis }) => {
    const [copied, setCopied] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(emojis[currentIndex]);
        setCopied(true);
    };

    const retryAction = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % emojis.length);
        setCopied(false);
    };

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => {
                setCopied(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [emojis[currentIndex], copied]);

    return (
        <div className={styles.emoji}>
            <motion.p
                key={emojis[currentIndex]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {emojis[currentIndex]}
            </motion.p>
            <button className={styles.actionButton} onClick={copyToClipboard} aria-label="Copy to Clipboard">
                {copied ? <FaCheck data-testid="check-icon" /> : <FaCopy data-testid="copy-icon" />}
            </button>
            <button className={styles.actionButton} onClick={retryAction} aria-label="Retry">
                <FaRedo />
            </button>
        </div>
    );
};

export default Emoji;
