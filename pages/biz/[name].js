import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import { getListings } from "../../utils/getListings";
import ListingMedia from "../../components/ListingMedia";
import Map from "../../components/Map";
import listing from "../../css/listing.module.css";
import Icons from "../../components/Icons.js";

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

    const [ content, setContent ] = useState(props.content);
    const [ width, setWidth ] = useState(get_width);

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


    return (
        <div>
            <Head>
                <title>{content.name} - Spicy Green Book</title>
                <meta
                    name="description"
                    content="Support local black owned businesses with our free directory"
                />
            </Head>
            {width > 900 && 
                <div className={listing.layoutMap}>
                    <Map list={[content]} mode="d" />
                </div>
            }
            <div className={listing.layoutList} style={{backgroundColor: '#fff'}}>

                <div style={{margin: '20px 0'}}>
                    <a className="buttonBack" href="/" style={{whiteSpace: 'nowrap', marginBottom: 40}}>
                        <Icons type="left" color="#B56230" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginRight: 20}} />
                        <span style={{display: 'inline-block', verticalAlign: 'middle'}}>
                            Back To Home
                        </span>
                    </a>
                </div>

                <ListingMedia content={content} />
                <div style={{marginTop: 20}}>
                    <div className={listing.cols}>
                        <div className={listing.col}>
                            <h1 style={{color: '#29293E', fontSize: 30, fontWeight: 'normal', margin: 0}}>{content.name}</h1>
                            <p style={{whiteSpace: 'pre'}}>
                                {content.address}
                            </p>
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
                                    <a href={'https://instagram.com/' + (content.instagram.indexOf('@') > -1 ? content.instagram.slice(1) : content.instagram)}>
                                        <Icons type="instagram" color="#B56230" style={{width: 16, height: 16, marginRight: 10}} />
                                        <span className="ib middle">{content.instagram.substr(1)}</span>
                                    </a>
                                </p>
                            }
                            {content.website_url && 
                                <p>
                                    <a href={content.website_url}>
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
                                            )}</span>
                                    </a>
                                </p>
                            }

                        </div>
                    </div>
                    <div>
                        <Icons type="tag" color="#CF9052" style={{width: 14, height: 14, marginRight: 6}} />
                        {content.cuisines.map((line, i , ar) => (
                            <span key={line} style={{color: '#CF9052',display: 'inline-block', 'vertical-align': 'middle'}}>
                                <span>{line}</span>
                                {ar[i+1] && (<span>,{'\u00A0'}</span>)}
                            </span>
                        ))}
                    </div>
                    <div>
                        <Icons type="services" color="#CF9052" style={{width: 14, height: 14, marginRight: 6}} />
                        {content.services.map((line, i , ar) => (
                            <span key={line} style={{color: '#CF9052',display: 'inline-block', 'vertical-align': 'middle'}}>
                                <span>{line}</span>
                                {ar[i+1] && (<span>,{'\u00A0'}</span>)}
                            </span>
                        ))}
                    </div>
                    <p>
                        { content.hours.map((line, l) => (<span key={l}>{line}<br /></span>)) }
                    </p>
                    {content.bio && 
                        <div style={{marginTop: 40}}>
                            <h3 style={{color: '#29293E', fontSize: 18, fontWeight: 'normal', margin: 0}}>About {content.name}</h3>
                            {content.bio.map((line, l) => (
                                <p key={l}>{line}</p>
                            ))}
                        </div>
                    }
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
