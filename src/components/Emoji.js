import React from "react";
import { useState } from 'react';
import styles from '../styles/Emoji.module.css';

const Emoji = ({ emoji }) => {
    const [copied, setCopied] = useState(false);

    function copyToClipboard() {
        navigator.clipboard.writeText(emoji);
        setCopied(true);
    }
    return (
        <div className={styles.emoji}>
            <p>{emoji}</p>
            <button className={styles.copyButton} onClick={copyToClipboard}>
                {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
        </div>
    );
};

export default Emoji;