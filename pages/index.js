import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import { getContent, getListings } from "../utils/getListings";
import home_styles from '../css/home.module.css';
import scrollableList from '../css/scrollableList.module.css';

export default (props) => {

	const {content, listings} = props

	console.log('props', props)

	return (
		<div className="page-home">
			<Head>
				<title>Spicy Green Book</title>
				<meta
					name="description"
					content=""
				/>
			</Head>
			<section className={home_styles.hero}>
				<div className={home_styles.heroContent}>
					<h1 className={home_styles.heroText}>
						Spicy Green Book
					</h1>
					<div className={home_styles.heroCredit}>
						Cake by Arielle Batson<br />
						<a style={{color: '#fff', textDecoration: 'none'}} href="https://instagram.com/arry829">@arry829</a>
					</div>
				</div>
			</section>
			<div className="content" style={{padding: '40px 20px'}}>
				<p>
					{content.home_page_text.map((text, i) => (
						<span key={i}>{text} <br /></span>
					))}
				</p>
				<center>
					<a className="button" href="/search">Show Me The Results</a>
				</center>
			</div>
            <div className={scrollableList.wrapper}>
	            <div className={scrollableList.container}>
	                {listings && listings.map((listing, i) => (
	                    <a
                            key={i}
	                        className={scrollableList.item}
	                        href={'/biz/' + listing._slug}
	                    >
	                    	<div
		                        className={scrollableList.media}
		                        style={{ backgroundImage: `url(${listing.primary_image.url})` }}
	                    	/>
	                    	<div className={scrollableList.title}>{listing.name}</div>
	                    	<div className={scrollableList.subTitle}>{listing.cuisines.join(', ')}</div>
	                    </a>
	                ))}
	            </div>
	        </div>
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
