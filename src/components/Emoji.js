import React, { useState, useEffect } from "react";
import styles from "../styles/Emoji.module.css";

const Emoji = ({ emoji }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(emoji);
        setCopied(true);
    };

    useEffect(() => {
        if (copied) {
            const timer = setTimeout(() => {
                setCopied(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [emoji, copied]);

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
