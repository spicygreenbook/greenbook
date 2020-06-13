import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { getListings } from "../utils/getListings";
import Map from "../components/Map";
import Header from "../components/Header";
import list from "../css/list.module.css";
import Icons from "../components/Icons.js";

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
	let { listings, cuisines } = props;

	console.log("props", props);
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

	console.log("listings", listings);
	return (
		<div>
			<Head>
				<title>Spicy Green Book</title>
				<meta
					name="description"
					content="Support local black owned businesses with our free directory"
				/>
			</Head>
			<div style={{ padding: "20px 20px 0 20px" }}>
				<a className="button" href="/" style={{padding: '4px 6px'}}>
					<Icons type="scrollDown" color="#fff" style={{display: 'inline-block', width: 14, height: 14, verticalAlign: 'middle', transform: 'rotate(90deg)'}} />
                    <span style={{display: 'inline-block', verticalAlign: 'middle', marginLeft: 6}}>
                        Home
                    </span>
				</a>
				<select
					name="cuisine"
					value={cuisine.toLowerCase().trim()}
					onChange={(e) => {
						let value = e.target.value;
						setCuisine(value);
					}}
				>
					<option value="">Show all cuisines</option>
					{cuisines.map((option) => {
						return (
							<option
								key={option}
								value={option.toLowerCase().trim()}
							>
								{option}
							</option>
						);
					})}
				</select>
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
												<p>{row.cuisines.join(", ")}</p>
												<p className={list.description}>{row.description}</p>
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

	console.log("data is", data);
	return {
		props: { listings: data.listings, cuisines: data.cuisines },
	};
}
