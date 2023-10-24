import styles from "../styles/EmojiCard.module.css";

const EmojiCard = ({ emoji, word }) => {
    return (
        <div className={styles.emojiCard}>
            <p className={styles.emoji}>{emoji}</p>
            <p className={styles.word}>{word}</p>
        </div>
    );
}

export default EmojiCard;
