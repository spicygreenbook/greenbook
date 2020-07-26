import Link from "next/link";
import Icons from "./Icons.js";

export default function Header(props) {
    return (
        <footer className="content" style={{padding: '40px 20px'}}>
            <div className="col">
                <div>
                    <a href="/" className="link" style={{fontSize: 24}}>Spicy Green Book</a>
                </div>
                <div style={{marginTop: 10}}>
                    <a className="socialIcons" href="https://www.instagram.com/spicygreenbook/" target="_blank">
                        <Icons type="instagram" color="#B56230" className="ib middle" style={{width: 24, height: 24}} />
                    </a>
                    <a className="socialIcons" href="https://www.facebook.com/SpicyGreenBook/" target="_blank">
                        <Icons type="facebook" color="#B56230" className="ib middle" style={{width: 24, height: 24}} />
                    </a>
                    <a className="socialIcons" href="https://twitter.com/Spicy_GreenBook" target="_blank">
                        <Icons type="twitter" color="#B56230" className="ib middle" style={{width: 24, height: 24}} />
                    </a>
                    <a className="socialIcons" href="https://www.linkedin.com/company/spicy-green-book/" target="_blank">
                        <Icons type="linkedin" color="#B56230" className="ib middle" style={{width: 24, height: 24}} />
                    </a>
                </div>
                <div style={{marginTop: 10}}>
                    We're growing fast, keep up!
                </div>
                <div
                    dangerouslySetInnerHTML={{
                      __html: `
                        <div id="mc_embed_signup">
                            <form action="https://spicygreenbook.us10.list-manage.com/subscribe/post?u=51c52bc37485392a66fae588d&amp;id=e09a86d809" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                                <div id="mc_embed_signup_scroll" style="line-height: 400%">
                                    <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email address" required style="background:#fff;color: #000">
                                    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_51c52bc37485392a66fae588d_e09a86d809" tabindex="-1" value=""></div>
                                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button">
                                </div>
                            </form>
                        </div>
                    `}} />
            </div>
            <div className="col">
                <Link href="/donate"><a className="link">Donate</a></Link>
                <Link href="/about"><a className="link">About Us</a></Link>
                <Link href="/staff"><a className="link">Staff</a></Link>
                <Link href="/our-process"><a className="link">Our Process</a></Link>
                <Link href="/volunteer"><a className="link">Volunteer</a></Link>
                <Link href="/updates"><a className="link">Latest Updates</a></Link>
                <Link href="/press"><a className="link">Press</a></Link>
                <Link href="/add"><a className="link">Add Your Listing</a></Link>
                <Link href="/contact"><a className="link">Contact Us</a></Link>
            </div>
            <div style={{marginTop: 20}}>
                <a href="https://vercel.com/?utm_source=spicygreenbook" style={{color: 'inherit', textDecoration: 'none'}} target="_blank">
                    <span className="ib middle" style={{lineHeight: '50%'}}>Powered By</span>
                    {' '}
                    <svg className="ib middle" width="95" height="22" viewBox="0 0 283 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M141.04 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM248.72 16c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zM200.24 34c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9V5h9zM36.95 0L73.9 64H0L36.95 0zm92.38 5l-27.71 48L73.91 5H84.3l17.32 30 17.32-30h10.39zm58.91 12v9.69c-1-.29-2.06-.49-3.2-.49-5.81 0-10 4-10 10V51h-9V17h9v9.2c0-5.08 5.91-9.2 13.2-9.2z" fill="#000"/></svg>
                </a>
            </div>
            <div style={{marginTop: 20}}>
                <a href="https://clickup.com/?utm_source=spicygreenbook" style={{color: 'inherit', textDecoration: 'none'}} target="_blank">
                    <span className="ib middle" style={{lineHeight: '50%'}}>Assisted By</span>
                    {' '}
                    <svg style={{marginLeft: 4}} className="ib middke" width="133" height="45" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 666 222"><defs><linearGradient x1="0%" y1="68.01%" y2="68.01%" id="a"><stop stopColor="#8930FD" offset="0%"/><stop stopColor="#49CCF9" offset="100%"/></linearGradient><linearGradient x1="0%" y1="68.01%" y2="68.01%" id="b"><stop stopColor="#FF02F0" offset="0%"/><stop stopColor="#FFC800" offset="100%"/></linearGradient></defs><g fillRule="nonzero" fill="none"><path d="M.4 119.12l23.81-18.24C36.86 117.39 50.3 125 65.26 125c14.88 0 27.94-7.52 40.02-23.9l24.15 17.8C112 142.52 90.34 155 65.26 155c-25 0-46.87-12.4-64.86-35.88z" fill="url(#a)"/><path fill="url(#b)" d="M65.18 39.84L22.8 76.36 3.21 53.64 65.27.16l61.57 53.52-19.68 22.64z"/><path d="M220.74 132.47c-14.47 0-26.53-4.69-36.31-14.07-9.78-9.51-14.6-21.7-14.6-36.58 0-15 4.95-27.33 14.73-36.98 9.92-9.78 21.98-14.6 36.32-14.6 17.69 0 33.36 7.63 42.48 19.56L247.4 66.55c-7.64-8.18-15.95-12.33-24.92-12.33-7.64 0-13.94 2.54-19.17 7.77-5.09 5.23-7.63 11.8-7.63 19.7 0 7.64 2.54 14.07 7.63 19.3 5.23 5.09 11.53 7.63 19.03 7.63 9.78 0 18.36-4.29 25.46-12.73l16.62 15.95c-4.56 6.03-10.72 10.99-18.36 14.87-7.64 3.89-16.08 5.76-25.33 5.76zm71.8-103.71V131h-23.58V28.76h23.58zm22.35 21.7c-7.9 0-13.66-5.76-13.66-13.66 0-7.64 6.03-13.4 13.66-13.4 7.64 0 13.54 5.76 13.54 13.4 0 7.9-5.9 13.67-13.54 13.67zm11.93 6.57V131H303.1V57.03h23.72zm45.4 75.58c-11.66 0-21.04-3.62-28.4-10.86-7.24-7.23-10.86-16.48-10.86-27.87s3.62-20.63 10.99-27.87c7.37-7.24 16.88-10.85 28.67-10.85 15.41 0 28.95 7.5 35.24 21.57l-18.89 9.92c-3.75-6.3-8.98-9.52-15.81-9.52-4.96 0-8.98 1.61-12.2 4.83a16.7 16.7 0 0 0-4.69 11.92c0 9.78 7.1 17.02 16.62 17.02 6.83 0 13.13-3.75 15.81-9.51l18.9 11.25c-6.44 12.33-19.7 19.97-35.38 19.97zM489.85 131H461.7l-21.85-29.35-3.48 3.22V131H412.8V28.76h23.58v49.71l22.24-21.44h28.81l-31.75 29.75L489.85 131zm1.58-38.46V31.97h25.19v60.17c0 11.12 6.43 16.48 15.68 16.48 9.11 0 15.54-5.63 15.54-16.48V31.97h25.33v60.57c0 29.21-20.24 40.2-40.87 40.2-20.5 0-40.87-10.99-40.87-40.2zm137.72-37.38c10.59 0 19.17 3.75 26 11.25 6.83 7.37 10.18 16.62 10.18 27.47 0 10.86-3.48 20.1-10.31 27.74-6.84 7.5-15.41 11.26-25.73 11.26-8.18 0-15.28-2.68-21.04-8.04v36.58h-23.72V57.03h23.32v6.84c5.76-5.77 12.86-8.71 21.3-8.71zm12.06 38.99c0-9.65-6.96-17.02-16.61-17.02-9.65 0-16.75 7.37-16.75 17.02 0 4.69 1.6 8.71 4.69 12.06 3.21 3.35 7.23 4.96 12.06 4.96 4.82 0 8.84-1.61 11.92-4.96a17.25 17.25 0 0 0 4.7-12.06z" fill="#111"/></g></svg>
                </a>
            </div>
        </footer>
  );
}
 