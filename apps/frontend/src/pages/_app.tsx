import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>SpeedCube Studio - Multiplayer Speedcubing Timer</title>
        <meta name="description" content="A multiplayer speedcubing timer and training platform for Rubik's cube enthusiasts" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        {/* Theme color with fallback for older browsers */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SpeedCube Studio" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SpeedCube Studio - Multiplayer Speedcubing Timer" />
        <meta property="og:description" content="A multiplayer speedcubing timer and training platform for Rubik's cube enthusiasts" />
        <meta property="og:image" content="/logo.svg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="SpeedCube Studio - Multiplayer Speedcubing Timer" />
        <meta property="twitter:description" content="A multiplayer speedcubing timer and training platform for Rubik's cube enthusiasts" />
        <meta property="twitter:image" content="/logo.svg" />
      </Head>
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
