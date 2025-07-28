import type { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
