import '../css/style.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
        <Component {...pageProps} />

        <footer className="content" style={{padding: '40px 20px'}}>
            <div className="col">
                <a href="/" className="link" style={{fontSize: 24}}>Spicy Green Book</a>
            </div>
            <div className="col">
                <a className="link" href="/donate">Donate</a>
                {/*<a className="link" href="/our-process">Our Process</a>*/}
                <a className="link" href="/volunteer">Volunteer</a>
                <a className="link" href="/updates">Latest Updates</a>
                <a className="link" target="_blank" href="/add">Add Your Listing</a>
            </div>
        </footer>

    </div>
    );
}