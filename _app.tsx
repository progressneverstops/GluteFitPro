import '../pages/styles.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <div>a Lighthouse Portal App</div>
    </>
  );
}

export default MyApp;
