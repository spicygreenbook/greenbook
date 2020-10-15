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
                    <a className="socialIcons" href="https://twitter.com/spicygreenbook" target="_blank">
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
                <Link href="/SpicyGreenBook_PressRelease_09_11_2020.pdf"><a className="link" target="_blank">Press Release</a></Link>
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
            <div style={{marginLeft:-10}}>
                <a href="https://www.livechat.com/" target="_blank">
                    <img width="160" src="https://cdn.livechatinc.com/website/media/img/resources/logos/livechat-logo-monochrome-256x93.png" alt="Customer service software" />
                </a>
            </div>
        </footer>
  );
}
 