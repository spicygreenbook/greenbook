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
                    {content.body.map((text, i) => (
                        <p key={i}>{text}</p>
                    ))}
                </div>
                <div className="content" style={{padding: '20px 20px 40px 20px'}}>
                    {updates.map(update => (
                        <div style={{marginBottom: 40}}>
                            <div className="ibb top" style={{width: '20%'}}>
                                <a href={update.image.url} target="_blank"><img src={update.image.url + '&w=200'} /></a>
                            </div>
                            <div className="ibb top" style={{width: '80%', paddingLeft: 20}}>
                                <h3 style={{margin: '0 0 20px 0'}}>{update.title}</h3>
                                <p>{update.date}</p>
                                <p>{update.body}</p>
                               {!!update.action_text && <p>
                                    <a className="buttonSmall" href={update.link}>
                                        {update.action_text}
                                    </a>
                                </p>}
                            </div>
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
    let content = await getContent({type: 'content', uid: 'updates', ref_id: config.preview || ''});
    return content.content
}

export async function getStaticProps(context) {

    let content = await getData(context);
    let updates = await getUpdates({type: 'updates'});

    return {
        props: {
            content: content,
            updates: updates
        },
    };
}
