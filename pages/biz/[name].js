import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { getListings } from "../../utils/getListings";
import Header from "../../components/Header";

export default (props) => {

    let content = props.content;
    if (typeof window !== "undefined") {
        console.log("props", props);
    }

    return (
        <div>
            <Head>
                <title>{content.name} - Spicy Green Book</title>
                <meta
                    name="description"
                    content="Support local black owned businesses with our free directory"
                />
            </Head>
            <div style={{margin: '6px 20px'}}>
                <a className="button" href="/search">&lt; Return To Listings</a>
            </div>
            <div className="splashMedia-wrapper">
	            <div className="splashMedia-container">
	                {content.images && content.images.map((image, i) => (
	                    <span
                            key={i}
	                        class="splashMedia"
	                        style={{ backgroundImage: `url(${image.url})` }}
	                    />
	                ))}
	            </div>
	        </div>
            <div style={{maxWidth: 800, margin: '0 auto', padding: 20}}>
                <h1>{content.name}</h1>
            </div>

        </div>
    );
};

export async function getStaticPaths() {

    let data = await getListings({});

    return {
        paths: data.listings.map((biz) => {
            return {
                params: { name: biz._slug },
            };
        }),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {

    let data = await getListings({});
    let content = {};
    console.log('params', params)
    data.listings.forEach(item => {
        if(item._slug === params.name) {
            content = item;
        }
    })

    return {
        props: {
            content: content
        },
    };
}
