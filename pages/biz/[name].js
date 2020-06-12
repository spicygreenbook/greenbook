import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import { getListings } from "../../utils/getListings";
import ListingMedia from "../../components/ListingMedia";
import Map from "../../components/Map";
import listing from "../../css/listing.module.css";

export default (props) => {

    const [ content, setContent ] = useState(props.content);

    let query = {};
    if (typeof window !== "undefined") {
        let params = (window.location.search || "")
            .substr(1)
            .split("&")
            .forEach((pair) => {
                var spl = pair.split("=");
                query[decodeURIComponent(spl[0])] = decodeURIComponent(spl[1]);
            });
        console.log("props", props, "query", query);

        if (query.preview) {
            console.log('execute preview ref_id', query.preview)
            useEffect(
                () => {
                    getUpdatedData({preview: query.preview, name: content._slug}).then(res => {
                        setContent(res.props.content);
                        console.log('updated content', content)
                    });
                },
                [ ]
            );
        }
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
            <div style={{padding: '20px'}}>
                <a className="button" href="/search">&lt; Return To Listings</a>
            </div>
            <ListingMedia content={content} />
            <div style={{maxWidth: 800, margin: '0 auto', padding: 20}}>
                <h1>{content.name}</h1>
                <div className={listing.cols}>
                    <div className={listing.col}>
                        <p>
                            {content.cuisines.join(', ')}
                        </p>
                        <p style={{whiteSpace: 'pre'}}>
                            {content.address}
                        </p>
                        <p>
                            <a href={'tel:' + content.phone_number}>{content.phone_number}</a>
                        </p>
                        {content.website_url && (
                            <p>
                                <a
                                    href={
                                        content.website_url
                                    }
                                    target="_blank"
                                >
                                    {content.website_url
                                        .replace(
                                            "https://",
                                            ""
                                        )
                                        .replace(
                                            "http://",
                                            ""
                                        )
                                        .replace(
                                            "www.",
                                            ""
                                        )}
                                </a>
                            </p>
                        )}
                        <p>
                            { content.description }
                        </p>
                        <p>
                            {content.instagram && <a href={'https://instagram.com/' + (content.instagram.indexOf('@') > -1 ? content.instagram.slice(1) : content.instagram)}>{content.instagram}</a> }
                        </p>
                        <p>
                            { content.hours.map((line, l) => (<span key={l}>{line}<br /></span>)) }
                        </p>
                    </div>
                    <div className={listing.col}>
                        {content.geolocation && <Map list={[content]} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

async function getUpdatedData(params) {
    let config = {};
    if (params.preview){
        config.ref_id = params.preview
    }
    let data = await getListings(config);
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
        }
    };
}

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

export async function getStaticProps({params}) {
    return getUpdatedData(params)
}
