import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { getListings } from "../utils/getListings";
import Map from "../components/Map"
import Header from "../components/Header"
import list from "../css/list.module.css"

const fuzzySearch = (string, srch) => {
	return (string || "").match(
		RegExp(
			srch
				.trim()
				.split(/\s+/)
				.map(function (c) {
					return c.split("").join("\\W*");
				})
				.join("|"),
			"gi"
		)
	);
};

export default (props) => {

	const { listings } = props;
	console.log('listings', listings)
	return (
		<div>
			<Head>
				<title>Spicy Green Book</title>
				<meta
					name="description"
					content="Support local black owned businesses with our free directory"
				/>
			</Head>
			{/*}
			<Header setSearch={setSearch} search={search} neighborhoods={neighborhoods} neighborhood={neighborhood} setNeighborhood={setNeighborhood} />
		*/}
			<div className={list.layoutMap}>
				<Map list={listings} />
			</div>
			<div className={list.layoutList}>
				<div className={list.overallContainer}>
					<div className={list.boxContainer}>
						{listings && listings.length ? (
							<React.Fragment>
								{listings.map((row, i) => (
									<Link href={'/biz/' + row._slug} key={"item" + i}>
										<div className={list.box} style={{cursor: 'pointer'}}>
											<div
												className={list.boxImage}
												style={{
													backgroundImage:
														"url(" +
														row.primary_image.url +
														")",
												}}
											/>
											<div className={list.boxContent}>
												<h3 className={list.boxTitle}>
													{row.name}
												</h3>
												<p>
												{
													row.cuisines.join(', ')
												}
												</p>
												<p>
													{row.description}
												</p>
												<div className={list.boxContentRight}>
													{row.phone_number && <p>{row.phone_number}</p>}
													{row.instagram && <p>{row.instagram}</p>}
													{row.website_url && <p><a href={row.website_url} target="_blank">{row.website_url.replace('https://', '').replace('http://', '').replace('www.', '')}</a></p>}
												</div>
											</div>
										</div>
									</Link>
								))}
							</React.Fragment>
						) : (
							<span>Sorry, nothing matches your search</span>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getStaticProps(context) {
	let data = await getListings({});

	console.log('data is', data)
	return {
		props: { listings: data.listings },
	};
}
