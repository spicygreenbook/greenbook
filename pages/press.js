import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import css_content from '../css/home.module.css';
import { getContent, getUpdates } from "../utils/getListings";
import ContentPageHeader from "../components/ContentPageHeader";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

export default (props) => {

    const [ content, setContent ] = useState(props.content);
    const [ updates, setUpdates ] = useState(props.updates);
    console.log('cotnent', content);
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
                    getData({preview: query.preview}).then(get_content => {
                        setContent(get_content);
                        console.log('updated content', get_content, content)
                    });
                },
                [ ]
            );
        }
    }


    if (typeof window !== 'undefined') {
        console.log('props', props)
    }

    return (
        <div className="page-home">
            <Head>
                <title>{content.page_title} - Spicy Green Book</title>
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
                <meta property="og:title" content={content.page_title + " - Spicy Green Book"} key="title" />
                <meta property="og:url" content={"https://spicygreenbook.com/" + content.uid } key="og:url" />
            </Head>
            <header>
                <Menu mode="content" />
            </header>
            <div id="page">
                <ContentPageHeader />
                <div className="content" style={{padding: '40px 20px 20px 20px'}}>
                    <h1>{content.page_title}</h1>
                    {content.body.map((text, i) => (
                        <p key={i}>{text}</p>
                    ))}
                </div>
                <div className="content" style={{padding: '20px 20px 40px 20px'}}>
                    {updates.map((update, i) => (
                        <div style={{marginBottom: 100}} key={i}>
                            <h3 style={{margin: '0 0 20px 0'}}>{update.title}</h3>
                            <p>{update.name} on {update.date}</p>
                            <p>{update.body}</p>
                            {update.image && 
                                <a target="_blank"><img src={update.image.url + '&w=1024'} style={{borderRadius: 5}}/></a>
                            }
                            {update.embed_url && 
                                <div className="ib middle" style={{width: 'calc(100% - 1px)', position: 'relative', overflow: 'hidden'}}>
                                    <div style={{paddingTop: '56%'}} />
                                    <iframe width="100%" height="100%" src={update.embed_url} frameBorder="0" scrolling="no" allowFullScreen style={{position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, overflow: 'hidden'}} />
                                </div>
                            }


                           {!!update.action_text && <p>
                                <a className="button" href={update.link} target="_blank">
                                    {update.action_text}
                                </a>
                            </p>}
                        </div>
                    ))}
                </div>
                <Footer />
            </div>
        </div>
    );
};

async function getData(config) {
    if (!config) { config = {}; }
    console.log('config get data after load', config)
    let content = await getContent({type: 'content', uid: 'press', ref_id: config.preview || ''});
    return content.content
}

export async function getStaticProps(context) {

    let content = await getData(context);
    let updates = await getUpdates({type: 'press'});

    return {
        props: {
            content: content,
            updates: updates
        },
    };
}
