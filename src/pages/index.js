import { useState } from 'react';
import Head from 'next/head';
import Emoji from "../components/Emoji";
import styles from '../styles/Home.module.css';

export default function Home() {
  const [word, setWord] = useState('');
  const [emoji, setEmoji] = useState('');
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/emoji?word=' + word);
      const data = await response.json();
      setEmoji(data.emoji);
      setSearch(true);
    } catch (error) {
      setError('💩 Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className={styles.container}>
      <Head>
        <title>Emoji Translator</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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

        {loading ? (
          <p className={styles.loading}>🔄</p>
        ) : (
          error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            emoji ? <Emoji emoji={emoji} /> : search && <p>😢 No emoji found.</p>
          )
        )}
      </main>
    </div>
  );
}
