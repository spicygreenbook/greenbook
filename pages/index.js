import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
import getListings from "../utils/getListings";

export default (props) => {
	const { cuisines, neighborhoods } = props;
	const [neighborhood, setNeighborhood] = useState("");
	const [search, setSearch] = useState("");
	let intervalTimer;

	console.log('cuisines', cuisines);

	return (
		<div>
			<Head>
				<title>Spicy Green Book</title>
				<meta
					name="description"
					content="Support local black owned businesses with our free directory"
				/>
			</Head>
			<div className="hero">
				<div className="hero-content">
					<div style={{textAlign: 'center'}}>
						<img src="/safari-pinned-tab-light.svg" style={{width: '50%', maxWidth: 200}} />
					</div>
					<form method="GET" action="/search">
						<input
							type="search"
							size="14"
							name="query"
							placeholder="Search"
							onChange={(e) => {
								let value = e.target.value;
								clearTimeout(intervalTimer);
								intervalTimer = setTimeout(() => {
									setSearch(value);
								}, 100);
							}}
						/>
						<select
							name="neighborhood"
							onChange={(e) => {
								let value = e.target.value;
								clearTimeout(intervalTimer);
								intervalTimer = setTimeout(() => {
									setNeighborhood(value);
								}, 100);
							}}
						>
							<option value="">Select a neighorhood</option>
							<option value="">Browse all neighborhoods</option>
							{neighborhoods.map((option) => {
								return (
									<option
										key={option}
										value={option.toLowerCase()}
									>
										{option}
									</option>
								);
							})}
						</select>
						<input type="submit" value="GO" />
					</form>
					<div
						style={{
							margin: "10px auto 0 auto",
							textAlign: "left",
							maxWidth: 900,
						}}
					>
						<h3 className="browseHeader">Browse Cuisines</h3>
						{cuisines.map((option) => {
							return (
								<a
									className="link"
									key={option}
									href={
										"/search?query=" +
										encodeURIComponent(option.toLowerCase())
									}
								>
									{option}
								</a>
							);
						})}
					</div>
					<div
						style={{
							margin: "10px auto 0 auto",
							textAlign: "left",
							maxWidth: 900,
						}}
					>
						<h3 className="browseHeader">Browse Neighborhoods</h3>
						{neighborhoods.map((option) => {
							return (
								<a
									className="link"
									key={option}
									href={
										"/search?neighborhood=" +
										encodeURIComponent(option.toLowerCase())
									}
								>
									{option}
								</a>
							);
						})}
					</div>
					<div style={{marginTop: 40, color: '#fff'}}>
						Cake by Arielle Batson <a style={{color: '#fff', textDecoration: 'none'}} href="https://instagram.com/arry829">@arry829</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export async function getStaticProps(context) {
	let data = await getListings({ saveImages: false });
	const rows = data.rows.map((row) => {
		return {
			Neighborhood: row.Neighborhood || "",
			_neighborhoods: row._neighborhoods || "",
			Cuisine: row.Cuisine || "",
			_cuisines: row._cuisines || "",
		};
	});
	return {
		props: {
			list: rows,
			neighborhoods: data.neighborhoods,
			cuisines: data.cuisines,
		},
	};
}
