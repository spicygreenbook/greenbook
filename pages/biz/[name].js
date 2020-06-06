import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import getListings from "../../utils/getListings";

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
    if (typeof window !== "undefined") {
        console.log("props", props);
    }
    const { cuisines, neighborhoods } = props;
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
    const [neighborhood, setNeighborhood] = useState(query.neighborhood || "");
    const [search, setSearch] = useState(query.query || "");
    const [cuisine, setCuisine] = useState(query.cuisine || "");
    let intervalTimer;

    const show_content_cols = [
        "Neighborhood",
        "Cuisine",
        "Service",
        "Hours",
        "IG",
        "Phone number",
        "Address",
    ];

    useEffect(() => {
        console.log("updated", search, neighborhood, query);
    }, [search, neighborhood, query]);

    const list = props.list
        .filter((row) => {
            return row._slug === props.name;
        })
        .map((row, i) => {
            let processed = row;
            processed._actions = [];
            row._neighborhood = "";
            row._cuisine = "";
            row._search = "";
            Object.keys(row).forEach((key) => {
                if (row[key] && typeof row[key] === "string") {
                    row._search += row[key];
                }
            });
            if (processed.Neighborhood) {
                row._neighborhood = processed.Neighborhood.trim().toLowerCase();
            }
            if (processed.Cuisine) {
                row._cuisine = processed.Cuisine.trim().toLowerCase();
            }
            if (processed.Website) {
                processed._actions.push(
                    <a
                        className="box-links"
                        key={"website" + i}
                        href={processed.Website}
                    >
                        Website
                    </a>
                );
                //delete processed.Website;
            }
            if (processed["Gift cards"]) {
                processed._actions.push(
                    <a
                        className="box-links"
                        key={"giftcards" + i}
                        href={processed["Gift cards"]}
                    >
                        Gift Cards
                    </a>
                );
                //delete processed['Gift cards']
            }
            if (processed["Merch/Online Store"]) {
                processed._actions.push(
                    <a
                        className="box-links"
                        key={"store" + i}
                        href={processed["Merch/Online Store"]}
                    >
                        Store
                    </a>
                );
                //delete processed['Merch/Online Store']
            }
            return processed;
        });

    let filtered_list = list
        .filter((row) => {
            let go = true;
            if (!row.Restaurant) {
                go = false;
            }
            if (search && !fuzzySearch(row._search, search)) {
                go = false;
            }
            if (neighborhood && row._neighborhood !== neighborhood) {
                go = false;
            }
            if (
                cuisine &&
                row.Cuisine &&
                row.Cuisine.toLowerCase().indexOf(cuisine) < 0
            ) {
                go = false;
            }
            return go;
        })
        .map((row) => row);

    let row = list[0];

    return (
        <div>
            <Head>
                <title>{row.Restaurant} - Spicy Green Book</title>
                <meta
                    name="description"
                    content="Support local black owned businesses with our free directory"
                />
            </Head>
            <div style={{ padding: "0 4%" }}>
                <form method="GET" action="/search">
                    <a className="top-grid" href="/">
                        <img src="/safari-pinned-tab.svg" height="80" />
                    </a>
                    <span className="top-grid">
                        <select
                            style={{ boxShadow: "none" }}
                            name="cuisine"
                            onChange={(e) => {
                                let value = e.target.value;
                                clearTimeout(intervalTimer);
                                intervalTimer = setTimeout(() => {
                                    setCuisine(value);
                                }, 100);
                            }}
                        >
                            <option value="">Show all cuisines</option>
                            {cuisines.map((option) => {
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
                    </span>
                    <span className="top-grid">
                        <select
                            style={{ boxShadow: "none" }}
                            name="neighborhood"
                            value={neighborhood.toLowerCase().trim()}
                            onChange={(e) => {
                                let value = e.target.value;
                                setNeighborhood(value);
                            }}
                        >
                            <option value="">Show all neighborhoods</option>
                            {neighborhoods.map((option) => {
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
                    </span>
                    <span className="top-grid">
                        <input
                            style={{ boxShadow: "none" }}
                            type="search"
                            size="14"
                            name="query"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => {
                                let value = e.target.value;
                                setSearch(value);
                            }}
                        />
                    </span>
                    <span className="top-grid">
                        <input
                            type="submit"
                            value="GO"
                            style={{ boxShadow: "none" }}
                        />
                    </span>
                </form>
            </div>
            <div style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                {props.images.map((image) => (
                    <span
                        class="splashMedia"
                        style={{ backgroundImage: `url(${image.media.src})` }}
                    />
                ))}
            </div>
            <div style={{ maxWidth: 800, margin: "20px auto" }}>
                <h3 className="box-title">{row.Restaurant}</h3>
                <p className="box-details">
                    {show_content_cols
                        .filter((key) => row[key])
                        .map((key, i) => (
                            <React.Fragment key={key + i}>
                                {key === "IG" ? (
                                    <span>
                                        <b>{key}</b>:{" "}
                                        <a
                                            href={
                                                "https://instagram.com/" +
                                                row[key].slice(1)
                                            }
                                        >
                                            {row[key]}
                                        </a>
                                        <br />
                                    </span>
                                ) : key === "Phone number" ? (
                                    <span>
                                        <b>{key}</b>:{" "}
                                        <a href={"tel:" + row[key]}>
                                            {row[key]}
                                        </a>
                                        <br />
                                    </span>
                                ) : (
                                    <span>
                                        <b>{key}</b>: {row[key]}
                                        <br />
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                </p>
                <div className="box-actions">
                    {row._actions.map((action) => action)}
                </div>
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    let data = await getListings({ saveImages: true });
    return {
        paths: data.rows.map((biz) => {
            return {
                params: { name: biz._slug },
            };
        }),
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
	const fs = require('fs');
    console.log("params", params);
    let data = await getListings({ saveImages: true });
    let details = data.rows.filter((row) => {
        console.log(row._slug, params.name);
        return row && row._slug === params.name;
    })[0];

    let insta = {};
    let path = "./public/assets/" + details._slug + ".json";
    try {
    	if (fs.existsSync(path)){
	        insta = JSON.parse(
	            fs.readFileSync(path) || {}
	        );
    	}
    } catch (e) {
    	console.log(e);
        console.log("no insta fgor", params.name.details._slug);
        insta = {};
    }

    let images = [];
    if (insta) {
        var parsed = insta && insta.entry_data && insta.entry_data.ProfilePage[0];
        if (
        	parsed && 
            parsed.graphql &&
            parsed.graphql.user &&
            parsed.graphql.user.edge_owner_to_timeline_media &&
            parsed.graphql.user.edge_owner_to_timeline_media.edges
        ) {
            parsed.graphql.user.edge_owner_to_timeline_media.edges.forEach(
                function (entry) {
                    if (entry) {
                        var post = entry.node;
                        var add = {};
                        add.id = post.id;
                        add.title = "";
                        if (
                            post.edge_media_to_caption &&
                            post.edge_media_to_caption.edges &&
                            post.edge_media_to_caption.edges[0] &&
                            post.edge_media_to_caption.edges[0].node
                        ) {
                            add.title =
                                post.edge_media_to_caption.edges[0].node.text ||
                                "";
                        }
                        add.url =
                            "https://www.instagram.com/p/" + post.shortcode;
                        if (post.display_url) {
                            add.media = {
                                src: post.display_url.replace(
                                    "http://",
                                    "https://"
                                ),
                                size: {
                                    w: post.dimensions.width,
                                    h: post.dimensions.height,
                                },
                            };
                        }
                        images.push(add);
                    }
                }
            );
        }
    }

    return {
        props: {
            name: params.name,
            images: images,
            list: data.rows,
            neighborhoods: data.neighborhoods,
            cuisines: data.cuisines,
        },
    };
}
