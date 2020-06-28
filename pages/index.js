import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import { getContent, getListings, getUpdates } from "../utils/getListings";
import home_styles from '../css/home.module.css';
import scrollableList from '../css/scrollableList.module.css';
import Icons from "../components/Icons";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

const scrollToRef = (fullContainerRef, ref) => {
    let scrollAmount = (ref.current.offsetLeft - fullContainerRef.current.scrollLeft);
    fullContainerRef.current.scrollBy({top: 0, left: scrollAmount, behavior: 'smooth'})
}

export default (props) => {

    const {content, listings, cuisines, updates} = props

    const [ search, setSearch ] = useState('');
    const [ cuisine, setCuisine ] = useState('');

    if (typeof window !== 'undefined') {
        console.log('props', props)
    }

    let fullContainerRef = useRef(null);
    listings.forEach(listing => {
        listing.ref = useRef(null);
    })

    const [ mediaIndex, setMediaIndex ] = useState(null);
    const [ scrolledMediaIndex, setScrolledMediaIndex ] = useState(mediaIndex);
    const [ scrollIgnore, setScrollIgnore ] = useState(false);

    useEffect(
        () => {
            if (listings[mediaIndex] && listings[mediaIndex].ref) {
                if (typeof window !== 'undefined') {
                    if (!scrollIgnore) {
                        scrollToRef(fullContainerRef, listings[mediaIndex].ref)
                    }
                }
            }
        },
        [ mediaIndex ]
    );


    let timer;
    const scrollFunc = (e) => {
        if (!scrollIgnore) {
            let left = e.target.scrollLeft;
            let curIndex = 0;
            listings.forEach((listing, i) => {
                if (listing.ref.current.offsetLeft <= left) {
                    curIndex = i
                    console.log('hit')
                }
                console.log('listing', i, 'offsetleft', listing.ref.current.offsetLeft, 'scroll left', left)
            })
            console.log('now scrolled to', curIndex)
            setScrolledMediaIndex(curIndex);
        }
    }

    return (
        <div className="page-home">
            <Head>
                <title>Spicy Green Book</title>
                <meta
                    name="description"
                    content={content.description}
                />
            </Head>
            <header>
                <Menu mode="home" />
            </header>
            <div id="page">
                <section className={home_styles.hero}>
                    <div className={home_styles.hero_image}  style={{backgroundImage: `url(${content.home_images && content.home_images[0] && content.home_images[0].image.url || ''}&w=1920)`}} />
                    <div className={home_styles.heroContainer}>

                        <a href="/" className={home_styles.logo}>Spicy Green Book</a>

                        <div className={home_styles.heroContent}>
                            <h1 style={{color: '#fff'}}>Support Black-Owned Business</h1>
                            <p>
                                <a href="/volunteer" className={home_styles.buttonHero}>Volunteer</a>
                                <a href="/donate" className={home_styles.buttonHero}>Donate</a>
                                <a href="/add" className={home_styles.buttonHero}>Add Listing</a>
                            </p>
                            <p style={{fontSize: 20, maxWidth: 500, lineHeight: '160%', margin: '40px 0'}}>
                                Help be the change.<br />
                                We're building a list of <b>food & beverage</b> businesses that you can support.
                            </p>
                            <div className={home_styles.searchBox}>
                                <form method="GET" action="/search">
                                    <div className={home_styles.searchBoxItem}>
                                        <label>
                                            <div>Search</div>
                                            <div style={{marginTop:17}}>
                                                <input className={home_styles.select} name="search" value={search} placeholder="Enter Location or keywords"  onChange={(e) => setSearch(e.target.value)} />
                                            </div>
                                        </label>
                                    </div>
                                    <div className={home_styles.searchBoxItem}>
                                        <label>
                                            <div>Food Category</div>
                                            <div style={{marginTop:17}}>
                                                <select className={home_styles.select} name="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                                                    <option value="">Show all</option>
                                                    {cuisines.map(cuisine => (
                                                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </label>
                                    </div>
                                    <div className={home_styles.searchBoxItem}>
                                        <label>
                                            <div>{'\u00A0'}</div>
                                            <div style={{marginTop:17}}>
                                                <input type="submit" value="Search" />
                                            </div>
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div style={{position: 'absolute', right: 10, bottom: 10, color: '#fff', fontSize: 10, zIndex:2, textAlign: 'right'}}>
                            Cake by Arielle Batson<br />
                            <a href="https://instagram.com/arry829" style={{color: '#fff', textDecoration: 'none'}}>@arry829</a>
                        </div>
                    </div>
                </section>
                <section className="content" style={{marginTop: 60}} >
                    <div className={home_styles.leftCol}>
                        <h2>More About Us</h2>
                        <p>
                            We are gathering a growing list of volunteers to help compile a directory of black owned businesses.
                            {' '}
                            <b>Our mission</b> is to establish a space to help people who seek to create change within their communities.
                        </p>
                        <p>
                            Support for these businesses will:
                        </p>
                        <ul>
                            <li>Help decrease the wealth gap</li>
                            <li>Create more job opportunities</li>
                            <li>Help prevent further injustices</li>
                            <li>Help implement needed reform</li>
                            <li>Ensure greater representation of people who will change outdated policies</li>
                        </ul>
                        <p>
                            We have a hard-working and <b>growing</b> team of volunteers to help provide this service with skills in writing, 
                            photography, and other professional services. We will do our best to <b>represent everyone on our list with high-quality photography and story telling</b> so they can enjoy discovering and learning more about businesses in their area.
                        </p>
                    </div>
                    <div className={home_styles.rightCol}>
                        <img src="/images/home1.png" />
                    </div>
                </section>
                <section className="content" style={{marginTop: 60}}>
                    <h2>Find a Place</h2>
                </section>
                <section className="content" style={{marginTop: 140}}>
                    <div style={{position: 'relative'}}>
                        <div className={home_styles.offsetDiv}>
                            <a className={"button"} href="/search" style={{whiteSpace: 'nowrap'}}>
                                <span style={{display: 'inline-block', verticalAlign: 'middle'}}>
                                    View All
                                </span>
                                <Icons type="scrollDown" color="#fff" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginLeft: 6, transform: 'rotate(-90deg)'}} />
                            </a>

                        </div>
                        <div style={{position: 'absolute', top: -80, left: 20, right: 20}}>
                            <div className={scrollableList.wrapper}>
                                <div className={scrollableList.container} ref={fullContainerRef} onScroll={scrollFunc}>
                                    {listings && listings.map((listing, i) => (
                                        <a
                                            key={i}
                                            className={scrollableList.item}
                                            ref={listing.ref}
                                            href={'/biz/' + listing._slug}
                                        >
                                            <div
                                                className={scrollableList.media}
                                                style={{ backgroundImage: `url(${listing.primary_image.url}&w=400)` }}
                                            />
                                            <div className={scrollableList.title}>{listing.name}</div>
                                            <div className={scrollableList.subTitle}>
                                                <Icons type="tag" color="#CF9052" style={{width: 14, height: 14, marginRight: 6}} />
                                                {listing.cuisines.map((line, i , ar) => (
                                                    <span key={line} style={{color: '#CF9052',display: 'inline-block', 'verticalAlign': 'middle'}}>
                                                        <span >{line}</span>
                                                        {ar[i+1] && (<span>,{'\u00A0'}</span>)}
                                                    </span>
                                                ))}
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={home_styles.leftArrow} onClick={(e) => {
                            let next_i = scrolledMediaIndex > 0 ? (scrolledMediaIndex - 1) : listings.length-1
                            setMediaIndex(next_i);
                            setScrolledMediaIndex(next_i);
                        }}>
                            <Icons type="left" color="#B56230" style={{width: 16, height: 16}} />
                        </div>
                        <div className={home_styles.rightArrow} onClick={(e) => {
                            let next_i = (scrolledMediaIndex+1);
                            if (!listings[next_i]) {
                                next_i = 0
                            }
                            setMediaIndex(next_i);
                            setScrolledMediaIndex(next_i);
                        }}>
                            <Icons type="right" color="#B56230" style={{width: 16, height: 16}} />
                        </div>
                    </div>
                </section>
                <section className="content" style={{marginTop: 60}}>
                    <div className={home_styles.leftCol}>
                        <h2>A Peek Back to Look Forward</h2>
                        <p>
                            From 1936 to 1964, in the midst of the Jim Crow era, black men and women were under the persistent threat of violence after sunset in the form of lynchings and other palpable hate crimes. To help many escape this violence, Victor Green created the <a href="https://savingplaces.org/stories/green-book-historic-travel-guide-for-black-america#.XuVK1J5Kjlx" target="_blank">Negro Motorist Green Book</a>. It listed vital places of refuge during the segregation era that included hotels, gas stations, grocery stores, night clubs, restaurants and “tourist homes” where homeowners welcomed travelers who had nowhere else to go. This valuable note of history not only shows us the racial discrimination that existed but also the importance and ingenuity of black entrepreneurship. Today we continue to push forward with black innovation and invite you to be a part of it.
                        </p>
                    </div>
                    <div className={home_styles.rightCol}>
                        <img src="/images/home2.png" />
                    </div>
                </section>
                <section className="content" style={{marginTop: 60}}>
                    <h2 style={{marginBottom: 40}}>What We've Been Up To Lately</h2>
                    {updates.map(update => (
                        <div className="grid-3" style={{position: 'relative'}}>
                            <a className="link-fill" href={update.link}></a>
                            <div>
                                <img src={update.image.url + '&w=600'} style={{borderRadius: 5, border: '1px solid #DAE1F5'}}/>
                            </div>
                            <h3>{update.title}</h3>
                            <p>{update.date}</p>
                            <p style={{paddingBottom: 40}}>{update.body}</p>
                        </div>
                    ))}
                    <div style={{marginTop: 20, textAlign: 'center'}}>
                        <a className="button" href="/updates">
                            <span style={{display: 'inline-block', verticalAlign: 'middle'}}>
                                See All Updates
                            </span>
                            <Icons type="scrollDown" color="#fff" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginLeft: 6, transform: 'rotate(-90deg)'}} />
                        </a>
                    </div>
                </section>
                <section style={{backgroundColor: '#EFEDEA', marginTop: 60, marginBottom: 60}}>
                    <div className="content fg1" style={{padding: '80px 20px'}}>
                        <p style={{fontSize: 24, maxWidth: 700, margin: '0 auto'}}>
                            <i>“It is certain, in any case, that ignorance, allied with power, is the most ferocious enemy justice can have.”</i>
                        </p>
                        <p style={{fontSize: 18, maxWidth: 700, margin: '60px auto 0 auto'}}>
                        <i> - James Baldwin</i>
                        </p>
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    );
};

export async function getStaticProps(context) {

    let data = await getListings();
    let get_content = await getContent({type: 'home_page'});
    let updates = await getUpdates({type: 'updates', limit: 6});

    return {
        props: {
            listings: data.listings.sort((a,b) => {
                if (a.home_page_order < b.home_page_order) { return -1; }
                if (a.home_page_order > b.home_page_order) { return 1; }
                return 0;
            }),
            cuisines: data.cuisines,
            content: get_content.content,
            updates: updates
        },
    };
}
