import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import { getListings } from "../../utils/getListings";
import ListingMedia from "../../components/ListingMedia";
import Map from "../../components/Map";
import listing from "../../css/listing.module.css";
import Icons from "../../components/Icons.js";
import {RichText} from 'prismic-reactjs';
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";

export default (props) => {

    let query = {};
    let get_width = 1000;
    if (typeof window !== "undefined") {
        get_width = window.innerWidth;
        let params = (window.location.search || "")
            .substr(1)
            .split("&")
            .forEach((pair) => {
                var spl = pair.split("=");
                query[decodeURIComponent(spl[0])] = decodeURIComponent(spl[1]);
            });
        //console.log("props", props, "query", query);

        if (query.preview) {
            //console.log('execute preview ref_id', query.preview)
            useEffect(
                () => {
                    getUpdatedData({preview: query.preview, name: content._slug}).then(res => {
                        setContent(res.props.content);
                        //console.log('updated content', content)
                    });
                },
                [ ]
            );
        }
    }

    const [ content, setContent ] = useState(props.content);
    const [ width, setWidth ] = useState(get_width);
    //console.log('content', props.content)
    if (typeof window !== 'undefined') {
        useEffect(
            () => {
                function handleResize() {
                  setWidth(window.innerWidth)
                }

                window.addEventListener('resize', handleResize);
                return () => window.removeEventListener('resize', handleResize);
            },
            [ ]
        );
    }

    let layoutStyle = {backgroundColor: '#fff'};
    if (!content.geocoordinates) {
        layoutStyle = {backgroundColor: '#fff', width: '100%', maxWidth: 1040, padding: 20, boxSizing: 'border-box', boxShadow: 'none', margin: '0 auto'}
    }

    return (
        <div>
            <Head>
                <title>{content.name} - Spicy Green Book</title>
                {content.description && 
                    <meta
                    name="description"
                    content={content.description}
                    key="description"
                    />
                }
                {content.description && 
                    <meta
                    name="og:description"
                    content={content.description}
                    key="og:description"
                    />
                }
                <meta property="og:title" content={content.name + " - Spicy Green Book"} key="og:title" />
                <meta
                    name="og:image"
                    content={content.primary_image.url + '&w=1200'}
                    key="og:image"
                />
                <meta property="og:url" content={"https://spicygreenbook.com/biz/" + content._slug } key="og:url" />
            </Head>
            <header>
                <Menu mode="content" />
            </header>
            <div id="page">

                <div>
                {content.geocoordinates && width > 900 && 
                    <div className={listing.layoutMap}>
                        <Map list={[content]} mode="d" single />
                    </div>
                }
                </div>

                <div className={listing.layoutList} style={layoutStyle}>

                    <div style={{margin: '20px 0'}}>
                        <a className="buttonBack" href="/search" style={{whiteSpace: 'nowrap', marginBottom: 40}}>
                            <Icons type="left" color="#B56230" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginRight: 20}} />
                            <span className="ib middle">
                                Back To List
                            </span>
                        </a>
                    </div>

                    <ListingMedia content={content} />
                    <div style={{marginTop: 20}}>
                        <div className={listing.cols}>
                            <div className={listing.col}>
                                <h1 style={{color: '#29293E', fontSize: 30, fontWeight: 'normal', margin: 0}}>{content.name}</h1>
                                {content.address && !!content.address.length && 
                                    <p style={{whiteSpace: 'pre'}}>
                                        <a href={`https://www.google.com/maps/dir//${content.address.join(' ').split(/\s/g).join('+')}`} target="_blank" style={{textDecoration: 'none', color: 'inherit'}}>
                                            {content.address}
                                        </a>
                                    </p>
                                }
                            </div>
                            <div className={listing.col}>
                                {content.phone_number && 
                                    <p>
                                        <a href={'tel:' + content.phone_number}>
                                            <Icons type="phone" color="#B56230" style={{width: 16, height: 16, marginRight: 10}} />
                                            <span className="ib middle">{content.phone_number}</span>
                                        </a>
                                    </p>
                                }
                                {content.instagram && 
                                    <p>
                                        <a href={'https://instagram.com/' + (content.instagram.indexOf('@') > -1 ? content.instagram.slice(1) : content.instagram)} target="_blank">
                                            <Icons type="instagram" color="#B56230" style={{width: 16, height: 16, marginRight: 10}} />
                                            <span className="ib middle">{content.instagram.substr(1)}</span>
                                        </a>
                                    </p>
                                }
                                {content.website_url && 
                                    <p>
                                        <a href={content.website_url} target="_blank">
                                            <Icons type="link" color="#B56230" style={{width: 16, height: 16, marginRight: 10}} />
                                            <span className="ib middle">{content.website_url
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
                                                ).split('/')[0]}</span>
                                        </a>
                                    </p>
                                }
                                {content.online_ordering_link && 
                                    <p>
                                        <a href={content.online_ordering_link} target="_blank">
                                            <Icons type="link" color="#B56230" style={{width: 16, height: 16, marginRight: 10}} />
                                            <span className="ib middle">Online Ordering</span>
                                        </a>
                                    </p>
                                }
                            </div>
                        </div>
                        <div>
                            <Icons type="tag" color="#CF9052" style={{width: 14, height: 14, marginRight: 6}} />
                            {content.cuisines.map((line, i , ar) => (
                                <span key={line} className="ib middle" style={{color: '#CF9052'}}>
                                    <span>{line}</span>
                                    {ar[i+1] && (<span>,{'\u00A0'}</span>)}
                                </span>
                            ))}
                        </div>
                        {content.services && !!content.services.length &&
                            <div>
                                <Icons type="services" color="#CF9052" style={{width: 14, height: 14, marginRight: 6}} />
                                {content.services.map((line, i , ar) => (
                                    <span key={line} className="ib middle" style={{color: '#CF9052'}}>
                                        <span>{line}</span>
                                        {ar[i+1] && (<span>,{'\u00A0'}</span>)}
                                    </span>
                                ))}
                            </div>
                        }
                        <p>
                            { content.hours.map((line, l) => (<span key={l}>{line}<br /></span>)) }
                        </p>

                        {content.geocoordinates && width <= 900 && <Map list={[content]} mode="m" single />}

                        {content.youtube_video && 
                            <div
                            dangerouslySetInnerHTML={{
                              __html: content.youtube_video.html}} />

                        }

                        {content.bio && 
                            <div style={{marginTop: 40}}>
                                <h3 style={{color: '#29293E', fontSize: 18, fontWeight: 'normal', margin: 0}}>About {content.name}</h3>
                                {RichText.render(content._bio.value)}
                            </div>
                        }

                        {content.attribution && content.attribution.length ?
                        ( 

                            <p style={{marginTop: 100}}>

                            {content.attribution.map((attribution, a) => (
                                <p key={'attr' + a}>
                                    {attribution.attribution_type === 'Photography' ? (
                                        <span>Thank you to professional photographer {attribution.attribution_name} for donating your time and talent providing the photos on this page.</span>
                                    ) : attribution.attribution_type === 'Videography' ? (
                                        <span>Thank you to professional videographer {attribution.attribution_name} for donating your time and talent providing the video on this page.</span>
                                    ) : attribution.attribution_type === 'Designer' ? (
                                        <span>Thank you to professional designer {attribution.attribution_name} for donating your time and talent providing design work for this business.</span>
                                    ) : (
                                        <span>Thank you to volunteer {attribution.attribution_name} for donating your time and talent on this page.</span>
                                    )}
                                    <br />
                                    {attribution.attribution_link && 
                                        <a className="ib middle" href={attribution.attribution_link} style={{marginRight: 20}} target="_blank">
                                            <Icons type="link" color="#B56230" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginRight: 5}} />
                                            {attribution.attribution_link.replace(
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
                                                    ).split('/')[0]}
                                        </a>
                                    }
                                    {attribution.attribution_instagram && 
                                        <a className="ib middle" href={'https://instagram.com/' + (attribution.attribution_instagram.indexOf('@') > -1 ? attribution.attribution_instagram.slice(1) : attribution.attribution_instagram)} style={{marginRight: 20}} target="_blank">
                                            <Icons type="instagram" color="#B56230" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginRight: 5}} />
                                            {attribution.attribution_instagram}
                                        </a>
                                    }
                                </p>
                            ))}

                            </p>
                        ) : (<React.Fragment />)

                        }
                    </div>
                </div>
                <Footer />
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
    //console.log('params', params)
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
