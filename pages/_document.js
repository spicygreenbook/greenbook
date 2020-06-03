import Document, { Head, Main, NextScript } from 'next/document';
export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
            <title>Spicy Green Book</title>
            <meta name="description" content="Support local black owned businesses with our free directory" />
            <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
};