import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { getListings, getContent } from "../utils/getListings";
import Map from "../components/Map";
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
	let get_width = 1000;
	if (typeof window !== "undefined") {
		get_width = window.innerWidth;
		let params = (window.location.search || "")
			.substr(1)
			.split("&")
			.forEach((pair) => {
				var spl = pair.split("=");
				if (spl[0] && spl[1]) {
					query[decodeURIComponent(spl[0])] = decodeURIComponent(spl[1]);
				}
			});
	}
	const filter = (row) => {
		var go = true;


		if (search) {
			if (!fuzzySearch(row._search, search)) {
				go = false;
			}
		}
		if (cuisine && row.cuisines.indexOf(cuisine) < 0) {
			console.log('no go')
			go = false;
		}
		return go;
	};

	const [cuisine, setCuisine] = useState(query.cuisine || '');
	const [filterConfig, setFilterConfig] = useState({search: query.search || '', cuisine: query.cuisine || ''});
	const [search, setSearch] = useState(query.search);
	const [width, setWidth] = useState(get_width);
	const [filteredList, setFilteredList] = useState(
		listings.filter(filter)
	);

    useEffect(
        () => {
        	if (filterConfig.cuisine !== cuisine || filterConfig.search !== search) {
				setFilteredList(listings.filter(filter))
				setFilterConfig({search: search, cuisine: cuisine})
			}
        },
        [ cuisine, search ]
    );

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
				<title>Spicy Green Book</title>
				<meta
					name="description"
					content="Support local black owned businesses with our free directory"
				/>
			</Head>
            <div>
			{width > 900 && 
	            <div className={list.layoutMap}>
					<Map list={filteredList} mode="d" />
				</div>
			}
            </div>
			<div className={list.layoutList} style={{backgroundColor: '#fff'}}>
				<div>
	                <a className="buttonBack" href="/" style={{whiteSpace: 'nowrap', marginBottom: 40}}>
	                    <Icons type="left" color="#B56230" style={{display: 'inline-block', width: 16, height: 16, verticalAlign: 'middle', marginRight: 20}} />
	                    <span style={{display: 'inline-block', verticalAlign: 'middle'}}>
	                        Back To Home
	                    </span>
	                </a>
	            </div>
                <div className={home_styles.searchBox} style={{textAlign: 'left', position: 'relative', zIndex: 2, padding: '20px 0'}}>
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

				<h3>{cuisine ? cuisine : 'All Businesses'} ({filteredList && filteredList.length})</h3>

				{width <= 900 && <Map list={filteredList} mode="m" />}

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
	                                            	<span key={line} style={{color: '#CF9052',display: 'inline-block', 'verticalAlign': 'middle'}}>
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

    data.listings.forEach(row => {
    	row._search = JSON.stringify(row)
    })

	return {
		props: { listings: data.listings, cuisines: data.cuisines, content: get_content.content },
	};
}
