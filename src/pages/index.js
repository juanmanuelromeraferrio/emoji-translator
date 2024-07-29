import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Head from 'next/head';
import Emoji from "../components/Emoji";
import Footer from "../components/Footer";
import EmojiCounter from "../components/EmojiCounter";
import EmojiGrid from "../components/EmojiGrid";
import Script from 'next/script'

import styles from '../styles/Home.module.css';

export default function Home() {
  const [word, setWord] = useState('');
  const [emojis, setEmojis] = useState([]);
  const [recentTranslations, setRecenTranslations] = useState([]);
  const [search, setSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const addTranslation = (emoji, word) => {
    setRecenTranslations(prevEmojis => [{ emoji, word }, ...prevEmojis]);
  };

  const addTranslations = (translations) => {
    if (translations)
      setRecenTranslations(translations)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!word.trim()) {
      setError('🤦‍♂️ Please enter a value before submitting!');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/emojis?word=' + word);
      const data = await response.json();

      setEmojis(data.emojis);
      setSearch(true);
      if (data.emojis && data.emojis.length > 0) {
        addTranslation(data.emojis[0], word);
      }

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
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/android-icon-36x36.png" sizes="36x36" />
        <link rel="icon" type="image/png" href="/android-icon-48x48.png" sizes="48x48" />
        <link rel="icon" type="image/png" href="/android-icon-72x72.png" sizes="72x72" />
        <link rel="icon" type="image/png" href="/android-icon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/android-icon-144x144.png" sizes="144x144" />
        <link rel="icon" type="image/png" href="/android-icon-192x192.png" sizes="192x192" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="msapplication-square70x70logo" content="/ms-icon-70x70.png" />
        <meta name="msapplication-square150x150logo" content="/ms-icon-150x150.png" />
        <meta name="msapplication-wide310x150logo" content="/ms-icon-310x150.png" />
        <meta name="msapplication-square310x310logo" content="/ms-icon-310x310.png" />
        <link href="/apple-startup-320x460.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)" rel="apple-touch-startup-image" />
        <link href="/apple-startup-640x920.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/apple-startup-640x1096.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/apple-startup-748x1024.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: landscape)" rel="apple-touch-startup-image" />
        <link href="/apple-startup-750x1024.png" media="" rel="apple-touch-startup-image" />
        <link href="/apple-startup-750x1294.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="/apple-startup-768x1004.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 1) and (orientation: portrait)" rel="apple-touch-startup-image" />
        <link href="/apple-startup-1182x2208.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)" rel="apple-touch-startup-image" />
        <link href="/apple-startup-1242x2148.png" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" rel="apple-touch-startup-image" />
        <link href="/apple-startup-1496x2048.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)" rel="apple-touch-startup-image" />
        <link href="/apple-startup-1536x2008.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" rel="apple-touch-startup-image" />
        <meta charSet="utf-8" />
        <meta name="description" content="Translate words to an emoji." />
        <meta property="og:site_name" content="Emoji Translator" />
        <meta property="og:description" content="Translate words to an emoji in seconds." />
        <meta property="og:title" content="Emoji Translator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content="Translate words to an emoji in seconds." />
        <script async src="https://cdn.seline.so/seline.js"></script>
      </Head>
      <Script src="https://cdn.seline.so/seline.js"/>
      
      <main className={styles.main}>
        <h1 className={styles.title}>Emoji Translator</h1>
        <EmojiCounter/>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            id="word"
            type="text"
            placeholder="messi"
            className={styles.input}
            value={word}
            onChange={(event) => setWord(event.target.value)}
          />
          <button type="submit" className={styles.button}>
            <FaSearch />
          </button>
        </form>

        {loading ? (
          <p className={styles.loading}>🔄</p>
        ) : (
          error ? (
            <p className={styles.error}>{error}</p>
          ) : (
            (emojis && emojis.length > 0) ? <Emoji emojis={emojis} /> : search && <p>😢 No emoji found.</p>
          )
        )}
        <EmojiGrid emojis={recentTranslations} addEmojis={addTranslations} />
      </main>
      <Footer />
    </div>
  );
}
