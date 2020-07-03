import Document, { Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#eaeaea" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="manifest" href="site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />

          <script async src={`https://www.googletagmanager.com/gtag/js?id=UA-168538359-1`}/>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'UA-168538359-1');
            `}} />          <script
            dangerouslySetInnerHTML={{
              __html: `
              if('serviceWorker' in navigator) {
                  navigator.serviceWorker.register('/sw.js');
              };
              `}} />
        </body>
      </html>
    )
  }
};