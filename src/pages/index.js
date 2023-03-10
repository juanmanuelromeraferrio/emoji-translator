import { useState } from 'react';
import Head from 'next/head';
import Emoji from "../components/Emoji";
import styles from '../styles/Home.module.css';

export default function Home() {
  const [word, setWord] = useState('');
  const [emoji, setEmoji] = useState('');
  const [search, setSearch] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/emoji?word=' + word);
    const data = await response.json();
    setEmoji(data.emoji);
    setSearch(true);
  };



  return (
    <div className={styles.container}>
      <Head>
        <title>Emoji Translator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Emoji Translator</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="word">Enter a word:</label>
          <input
            id="word"
            type="text"
            className={styles.input}
            value={word}
            onChange={(event) => setWord(event.target.value)}
          />
          <button type="submit" className={styles.button}>Find Emoji</button>
        </form>

        {emoji ? <Emoji emoji={emoji} /> : search && <p>😢 No emoji found.</p>}
      </main>
    </div>
  );
}
