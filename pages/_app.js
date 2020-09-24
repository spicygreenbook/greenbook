import React from "react";
import Head from "next/head";
import '../css/style.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
                <meta name="description" content="Support black-owned business. We bring professional services to these businesses and then bring them to you. A new experience to find a new place to eat today!" key="description"></meta>
                <meta property="og:description" content="Support black-owned business. We bring professional services to these businesses and then bring them to you. A new experience to find a new place to eat today!" key="og:description" />
                <meta name="twitter:card" content="summary" key="twitter:card"></meta>
                <meta property="og:title" content="Spicy Green Book" key="title" />
                <meta property="og:type" content="website" key="og:type" />
                <meta property="og:url" content="https://spicygreenbook.com/" key="og:url" />
                <meta property="og:image" content="https://spicygreenbook.com/logo.png" key="og:image" />
            </Head>
           <Component {...pageProps} />
        </React.Fragment>
    );
}