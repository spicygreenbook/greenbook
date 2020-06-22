import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import css_content from '../css/home.module.css';
import { getContent, getListings } from "../utils/getListings";
import ContentPageHeader from "../components/ContentPageHeader";
import {RichText} from 'prismic-reactjs';
import Menu from "../components/Menu";
import Footer from "../components/Footer";

export default (props) => {

    const [ content, setContent ] = useState(props.content);
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
        <div>
            <Head>
                <title>{content.page_title} | Spicy Green Book</title>
                <meta
                    name="description"
                    content={content.description || ''}
                />
            </Head>
            <header>
                <Menu mode="content" />
            </header>
            <div id="page">
                <ContentPageHeader />
                <div className="content" style={{padding: '40px 20px'}}>
                    <h1>{content.page_title}</h1>
                    {RichText.render(content._body.value)}
                    <p>
                        <a class="button" href="https://docs.google.com/forms/d/e/1FAIpQLSdWxF-zHhh76WjEu1T1EM-2NAeE7Y3NHTGMLruJe_oXeSrkRQ/viewform" target="_blank">Add Listing Form</a>
                    </p>
                </div>
                <Footer />
            </div>
        </div>
    );
};

async function getData(config) {
    if (!config) { config = {}; }
    console.log('config get data after load', config)
    let content = await getContent({type: 'content', uid: 'add', ref_id: config.preview || ''});
    return content.content
}

export async function getStaticProps(context) {

    let content = await getData(context);

    return {
        props: {
            content: content
        },
    };
}
