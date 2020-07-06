import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import css_content from '../css/home.module.css';
import { getContent, getUpdates } from "../utils/getListings";
import ContentPageHeader from "../components/ContentPageHeader";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import RichText from '../components/RichText';

export default (props) => {

    const [ content, setContent ] = useState(props.content);
    const [ staff, setStaff ] = useState(props.staff);
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
                    {staff.sort((a,b) => {
                        if (a.order < b.order) { return -1; }
                        if (a.order > b.order) { return 1; }
                        return 0;
                    }).map(staff => (
                        <div style={{marginBottom: 40}}>
                            <div className="ibb top" style={{width: '20%'}}>
                                {staff.image && 
                                   <img src={staff.image.url + '&w=200'} style={{borderRadius: 5}}/>
                                }
                            </div>
                            <div className="ibb top" style={{width: '80%', paddingLeft: 20}}>
                                <h3 style={{margin: '0 0 20px 0'}}>{staff.title}</h3>
                                <h4 style={{margin: '0 0 20px 0'}}>{staff.name}</h4>
                                <RichText render={staff._description} />
                                { staff.links && staff.links.length && staff.links[0].link && staff.links.map(link => (
                                    <p>
                                        <b>{link.link_name}</b>: {link.link_description}<br />
                                        <a href={link.link}>{link.link}</a>
                                    </p>
                                  ))
                                }
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
    let content = await getContent({type: 'content', uid: 'staff', ref_id: config.preview || ''});
    return content.content
}

export async function getStaticProps(context) {

    let content = await getData(context);
    let staff = await getUpdates({type: 'staff'});

    console.log('content', content);
    console.log('staff', staff)

    return {
        props: {
            content: content,
            staff: staff
        },
    };
}
