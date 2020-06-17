import '../css/style.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
        <Component {...pageProps} />

        {/*
        <footer className="content" style={{padding: '40px 20px'}}>
            <div className="col">
                <a href="/" className="link" style={{fontSize: 24}}>Spicy Green Book.</a>
            </div>
            <div className="col">
                <a className="link" href="/volunteer">Volunteer</a>
                <a className="link" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdWxF-zHhh76WjEu1T1EM-2NAeE7Y3NHTGMLruJe_oXeSrkRQ/viewform?usp=sf_link">Add Your Listing</a>
            </div>
        </footer>
    */}

        <footer className="content" style={{padding: '40px 20px'}}>
            <a href="/" className="link" style={{fontSize: 24}}>Spicy Green Book.</a>
        </footer>

    </div>
    );
}