import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { getListings, getContent } from "../utils/getListings";
import Map from "../components/Map";
import Header from "../components/Header";
import list from "../css/list.module.css";
import Icons from "../components/Icons.js";
import home_styles from '../css/home.module.css';

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
	let { listings, cuisines, content } = props;

	let query = {};
	if (typeof window !== "undefined") {
		let params = (window.location.search || "")
			.substr(1)
			.split("&")
			.forEach((pair) => {
				var spl = pair.split("=");
				query[decodeURIComponent(spl[0])] = decodeURIComponent(spl[1]);
			});
	}
	const filter = (row) => {
		var go = true;
		if (cuisine && row._cuisines.indexOf(cuisine) < 0) {
			go = false;
		}
		return go;
	};

	const [cuisine, setCuisine] = useState(query.cuisine || '');
	const [search, setSearch] = useState("");
	const [filteredList, setFilteredList] = useState(
		listings.filter(filter)
	);

	/*
    useEffect(
        () => {
			getListings({}).then(data => {
				console.log('got updated data', data)
				listings = data.listings;
				cuisines = data.cuisines;
				setFilteredList(listings.filter(filter))
			})
        },
        []
    );
	*/
    useEffect(
        () => {
			setFilteredList(listings.filter(filter))
        },
        [ cuisine ]
    );

	return (
		<div>
			<Head>
				<title>Spicy Green Book</title>
				<meta
					name="description"
					content="Support local black owned businesses with our free directory"
				/>
			</Head>
            <section className={home_styles.hero}>
                <div className={home_styles.hero_image}  style={{backgroundImage: `url(${content.home_images && content.home_images[0] && content.home_images[0].image.url || ''}&w=1920)`}} />
                <div className={home_styles.heroContainer}>

                    <a href="/" className={home_styles.logo}>Spicy Green Book.</a>
                    <a className={home_styles.buttonHero}>List Your Business</a>

                    <div className={home_styles.heroContent} style={{paddingBottom: 40}}>
                        <h3 style={{color: '#fff', fontSize: 24}}>Find A Business Close To You</h3>
	                </div>
                    <div style={{position: 'absolute', right: 10, bottom: 10, color: '#fff', fontSize: 10, zIndex:2, textAlign: 'right'}}>
                        Cake by Arielle Batson<br />
                        <a href="https://instagram.com/arry829" style={{color: '#fff', textDecoration: 'none'}}>@arry829</a>
                    </div>
                </div>
            </section>
            <div style={{textAlign: 'center', marginTop: -40, marginBottom: 20}}>
                <div className={home_styles.searchBox} style={{textAlign: 'left', position: 'relative', zIndex: 2, boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.15)'}}>
                    <form method="GET" action="/search">
                        <div className={home_styles.searchBoxItem}>
                            <label>
                                <div>Search</div>
                                <div style={{marginTop:17}}>
                                    <input className={home_styles.select} name="search" value={search} placeholder="Enter Location or keywords"  onChange={(e) => setSearch(e.target.value)} />
                                </div>
                            </label>
                        </div>
                        <div className={home_styles.searchBoxItem}>
                            <label>
                                <div>Food Category</div>
                                <div style={{marginTop:17}}>
                                    <select className={home_styles.select} name="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                                        <option value="">Show all</option>
                                        {cuisines.map(cuisine => (
                                            <option key={cuisine} value={cuisine}>{cuisine}</option>
                                        ))}
                                    </select>
                                </div>
                            </label>
                        </div>
                        <div className={home_styles.searchBoxItem}>
                            <label>
                                <div>{'\u00A0'}</div>
                                <div style={{marginTop:17}}>
                                    <input type="submit" value="Search" />
                                </div>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
            <div className={list.layoutMap}>
				<Map list={filteredList} />
			</div>
			<div className={list.layoutList}>
				<div className={list.overallContainer}>
					<div className={list.boxContainer}>
						{filteredList && filteredList.length ? (
							<React.Fragment>
								{filteredList.map((row, i) => (
									<Link
										href={"/biz/" + row._slug}
										key={"item" + i}
									>
										<div
											className={list.box}
											style={{ cursor: "pointer" }}
										>
											<div
												className={list.boxImage}
												style={{
													backgroundImage:
														"url(" +
														row.primary_image.url +
														"&w=400)",
												}}
											/>
											<div className={list.boxContent}>
												<h3 className={list.boxTitle}>
													{row.name}
												</h3>
												<p className={list.description}>{row.description}</p>
	                                            <Icons type="tag" color="#CF9052" style={{width: 14, height: 14, marginRight: 6}} />
	                                            {row.cuisines.map((line, i , ar) => (
	                                            	<span key={line} style={{color: '#CF9052',display: 'inline-block', 'vertical-align': 'middle'}}>
	                                                	<span>{line}</span>
	                                                	{ar[i+1] && (<span>,{'\u00A0'}</span>)}
	                                                </span>
	                                            ))}
												<div
													className={
														list.boxContentRight
													}
												>
													{row.phone_number && (
														<p>
															{row.phone_number}
														</p>
													)}
													{row.address && (
														<p>
															{row.address}
														</p>
													)}

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
    let get_content = await getContent({type: 'home_page'});

	return {
		props: { listings: data.listings, cuisines: data.cuisines, content: get_content.content },
	};
}
