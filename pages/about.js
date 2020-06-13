import Link from "next/link";
import Head from "next/head";
import css_content from '../css/home.module.css';
import { getContent, getListings } from "../utils/getListings";

export default (props) => {

    const {content, listings} = props

    if (typeof window !== 'undefined') {
        console.log('props', props)
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
            <div className="content" style={{padding: '40px 20px'}}>
                {content.body.map((text, i) => (
                    <p key={i}>{text}</p>
                ))}
            </div>
        </div>
    );
};

export async function getStaticProps(context) {

    let data = await getListings();
    let get_content = await getContent({type: 'content', uid: 'about'});

    console.log('content', get_content.content)

    return {
        props: {
            listings: data.listings,
            content: get_content.content
        },
    };
}
