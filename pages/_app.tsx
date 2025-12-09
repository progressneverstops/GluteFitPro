import '../app/styles.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { getTheme, setTheme } from '../app/utils/theme';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize theme on app load
    const theme = getTheme();
    setTheme(theme);
  }, []);

  return <Component {...pageProps} />;
}

