import Document, { Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
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
            `}} />
        </body>
      </html>
    )
  }
};