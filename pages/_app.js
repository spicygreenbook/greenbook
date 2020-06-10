import '../css/style.css'

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <div>
        <Component {...pageProps} />
        <footer style={{maxWidth: 800, margin: '20px auto', backgroundColor: '#fff', padding: 20, boxSizing: 'border-box'}}>
            <a className="link">Contact Us</a>
            <a className="link">Browse by Neighborhood</a>
            <a className="link">Browse By Cuisine</a>
            <a className="link">Donate</a>
            <a className="link">Volunteer</a>
            <a className="link" target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSdWxF-zHhh76WjEu1T1EM-2NAeE7Y3NHTGMLruJe_oXeSrkRQ/viewform?usp=sf_link">Add Your Listing</a>
            <a className="link">Press</a>
            <a className="link">About Us</a>
        </footer>
    </div>
    );
}