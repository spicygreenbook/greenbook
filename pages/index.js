import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import { getContent, getListings } from "../utils/getListings";
import home_styles from '../css/home.module.css';
import scrollableList from '../css/scrollableList.module.css';
import Icons from "../components/Icons";

const scrollToRef = (ref) => {
    let scrollTop = ref.current.offsetTop - 20
    window.scrollTo({top: scrollTop, left: 0, behavior: 'smooth'})
}

export default (props) => {

    const {content, listings} = props

    if (typeof window !== 'undefined') {
        console.log('props', props)
    }

    let ref = useRef(null);

    return (
        <div className="page-home">
            <Head>
                <title>Spicy Green Book</title>
                <meta
                    name="description"
                    content={content.description}
                />
            </Head>
            <section className={home_styles.hero}>
                <div className={home_styles.hero_image}  style={{backgroundImage: `url(${content.home_images && content.home_images[0] && content.home_images[0].image.url || ''}&w=1920)`}} />
                <div className={home_styles.heroContent}>
                    <h1>Support Black Owned Business</h1>
                    <p style={{fontSize: 20, maxWidth: 900}}>
                        Help be the change.<br />
                        We're building a list of businesses that you can support in <b>Southern California</b>.
                    </p>
                    <p style={{marginTop: 40}}>
                        <a className={"button "+home_styles.button + " " + home_styles.buttonBlue} href="/about" style={{whiteSpace: 'nowrap'}} onClick={(e) => {
                            e.preventDefault();
                            scrollToRef(ref);
                        }}>
                            <span style={{display: 'inline-block', verticalAlign: 'middle'}}>
                                Learn More
                            </span>
                            <Icons type="scrollDown" color="#fff" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginLeft: 6}} />
                        </a>
                        <a className={"button "+home_styles.button} href="/search">Show Me The List</a>
                    </p>
                </div>
            </section>
            <section className="content" style={{marginTop: 60}} ref={ref} >
                <h2>More About Us</h2>
                <p>
                    We are gathering a growing list of volunteers to help build a list of black owned businesses. 
                    {' '}
                    <b>Our mission</b> is to create a space for people to easily help create change. 
                    Support for these businesses will:
                    <ul>
                        <li>Help decrease the wealth gap</li>
                        <li>Create more job opportunities</li>
                        <li>Help prevent further injustices</li>
                        <li>Help implement needed reform</li>
                        <li>Ensure greater representation of people who will change outdated policies</li>
                    </ul>
                    {' '}
                    We have a hard-working and <b>growing</b> team of volunteers to help provide this service with skills in writing, 
                    photography, and other professional services. We will do our best to <b>represent everyone in our list with high quality photography, videography and story-telling</b> so everyone can enjoy discovering and learning more about businesses in their area.
                </p>
            </section>
            <section className="content" style={{marginTop: 60}}>
                <h2>Find a Place</h2>
            </section>
            <div className={scrollableList.wrapper}>
                <div className={scrollableList.container}>
                    {listings && listings.sort((a,b) => {
                        if (a.home_page_order < b.home_page_order) { return -1; }
                        if (a.home_page_order > b.home_page_order) { return 1; }
                        return 0;
                    }).map((listing, i) => (
                        <a
                            key={i}
                            className={scrollableList.item}
                            href={'/biz/' + listing._slug}
                        >
                            <div
                                className={scrollableList.media}
                                style={{ backgroundImage: `url(${listing.primary_image.url}&w=400)` }}
                            />
                            <div className={scrollableList.title}>{listing.name}</div>
                            <div className={scrollableList.subTitle}>{listing.cuisines.join(', ')}</div>
                        </a>
                    ))}
                </div>
            </div>
            <section className="content" style={{marginTop: 60}}>
                <h2>A Peek Back To Look Forward</h2>
                <p>
                    From 1936 to 1964, in the midst of the Jim Crow era, black men and women were under the persistent threat of violence after sunset in the form of lynchings and other very real hate crimes. To help many escape this violence, <a href="https://en.wikipedia.org/wiki/Victor_Hugo_Green">Victor Green</a> created the <a href="https://savingplaces.org/stories/green-book-historic-travel-guide-for-black-america#.XuVK1J5Kjlx">Negro Motorist Green Book</a>. This book listed vital places of refuge during the segregation era that included hotels, gas stations, grocery stores, night clubs, restaurants, and “tourist homes” where homeowners welcomed travelers who had nowhere else to go. This valuable note of history not only shows us the racial discrimination that existed but also black entrepreneurship. Today we continue to push forward with today’s black innovation and invite you to be a part of it.
                </p>
            </section>
        </div>
    );
};

export async function getStaticProps(context) {

    let data = await getListings();
    let get_content = await getContent({type: 'home_page'});

    return {
        props: {
            listings: data.listings,
            content: get_content.content
        },
    };
}
