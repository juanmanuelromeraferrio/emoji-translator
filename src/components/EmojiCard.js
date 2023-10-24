import React, { useState, useEffect } from "react";
import styles from "../styles/EmojiCard.module.css";

const EmojiCard = ({ emoji, word }) => {

    const [copied, setCopied] = useState(false);
    const copyToClipboard = () => {
        navigator.clipboard.writeText(emoji);
        setCopied(true);
    };

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => {
                setCopied(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [emoji, copied]);

    return (
        <button className={`${styles.emojiCard} ${copied ? styles.copy : ''}`} onClick={copyToClipboard}>
            <p className={styles.emoji}>{emoji}</p>
            <p className={styles.word}>{copied ? 'copied' : word}</p>
        </button>
    );
}

export default EmojiCard;
