
export default function Header(props) {
    return (
        <footer className="content" style={{padding: '40px 20px'}}>
            <div className="col">
                <a href="/" className="link" style={{fontSize: 24}}>Spicy Green Book</a>
            </div>
            <div className="col">
                <a className="link" href="/donate">Donate</a>
                <a className="link" href="/about">About Us</a>
                <a className="link" href="/staff">Staff</a>
                <a className="link" href="/our-process">Our Process</a>
                <a className="link" href="/volunteer">Volunteer</a>
                <a className="link" href="/updates">Latest Updates</a>
                <a className="link" href="/add">Add Your Listing</a>
                <a className="link" href="/contact">Contact Us</a>
            </div>
        </footer>
  );
}
 