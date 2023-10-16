import styles from "../styles/EmojiCounter.module.css";
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const EmojiCounter = () => {
  const { data, error } = useSWR('/api/emojis/count', fetcher);

  let content;
  if (error) {
    content = "Error loading data.";
  } else if (!data) {
    content = "Loading...";
  } else {
    content = `${data.count} translations generated and counting!`;
  }

  return (
    <p className={styles.subtitle}>
      {content}
    </p>
  );
};

export default EmojiCounter;

