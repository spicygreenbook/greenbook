const fs = require("fs");
const http = {
	http: require("http"),
	https: require("https"),
};

async function saveImageToDisk(url, localPath) {
	return new Promise((resolve, reject) => {
		var fullUrl = url;
		var file = fs.createWriteStream(localPath);
		var request = http[url.indexOf("https") > -1 ? "https" : "http"].get(
			url,
			function (response) {
				response.pipe(file);
			}
		);
		request.on("end", resolve);
		request.on("error", reject);
		return request;
	});
}

async function fetchInsta(igname, row) {
	return new Promise(async (resolve, reject) => {
		igname = igname.indexOf("@") === 0 ? igname.substr(1) : igname;
		if (igname) {
			console.log('fetching ig...', igname)
			let data = await fetch("https://www.instagram.com/" + igname + "", {
				headers: {
					cookie: 'mid=XVBUBAAEAAH2PNXf3Z-4L6Qvk0dh; ig_did=DDC2E262-C1B9-4C2B-93B1-9ADB7A7C7E8F; csrftoken=4pP87kiff629eJjwwAoVSc8GEKZTmQRI; ds_user_id=4313273565; sessionid=4313273565%3AWxb2mOVbIsevXl%3A27; shbid=7898; shbts=1591281618.3389716; rur=FRC; urlgen="{\"172.88.195.113\": 20001}:1jgrQZ:OXB_XRJi5Z1mtiN-Traq9It_wdc"'
				}
			});
			let html = await data.text();
			try {
				const jsonObject = html
					.match(
						/<script type="text\/javascript">window\._sharedData = (.*)<\/script>/
					)[1]
					.slice(0, -1);
				const json = JSON.parse(jsonObject);
				if (row._img_path) {
					fs.writeFileSync(
						row._img_path.replace(".jpg", ".json"),
						JSON.stringify(json),
						"utf8"
					);
				} else {
					console.log('row path', row._img_path, 'row', row)
				}
				let user = json.entry_data && json.entry_data.ProfilePage && json.entry_data.ProfilePage[0] && json.entry_data.ProfilePage[0].graphql.user;
				//console.log('user', user)
				if (
					user &&
					user.profile_pic_url_hd
				) {
					row._img = row._slug + ".jpg";
					let saved = await saveImageToDisk(
						user.profile_pic_url_hd,
						row._img_path
					);
					if (saved) {
						resolve(true);
					} else {
						reject("failed to save image");
					}
				} else {
					resolve("all good but invalid ig for " + igname, row);
				}
				//console.log("json", json);
			} catch(ig_err) {
				console.log('failed to get insta for', igname, 'more data', row)
				console.error(ig_err)
			}
		} else {
			reject("no ig name");
		}
	});
}

async function getListings(config) {
	var sheet =
		"https://docs.google.com/spreadsheets/d/e/2PACX-1vTb5tlJvpBJH4dl8AMk-BRIgtGkPGZiTu601WxtVgQHXw70pKMpVf9klP8Ge7WZnQevXtvL8c9be4Aq/pub?gid=0&single=true&output=csv";
	function CSVToArray(strData, strDelimiter) {
		// Check to see if the delimiter is defined. If not,
		// then default to comma.
		strDelimiter = strDelimiter || ",";

		// Create a regular expression to parse the CSV values.
		var objPattern = new RegExp(
			// Delimiters.
			"(\\" +
				strDelimiter +
				"|\\r?\\n|\\r|^)" +
				// Quoted fields.
				'(?:"([^"]*(?:""[^"]*)*)"|' +
				// Standard fields.
				'([^"\\' +
				strDelimiter +
				"\\r\\n]*))",
			"gi"
		);

		// Create an array to hold our data. Give the array
		// a default empty first row.
		var arrData = [[]];

		// Create an array to hold our individual pattern
		// matching groups.
		var arrMatches = null;

		// Keep looping over the regular expression matches
		// until we can no longer find a match.
		while ((arrMatches = objPattern.exec(strData))) {
			// Get the delimiter that was found.
			var strMatchedDelimiter = arrMatches[1];

			// Check to see if the given delimiter has a length
			// (is not the start of string) and if it matches
			// field delimiter. If id does not, then we know
			// that this delimiter is a row delimiter.
			if (
				strMatchedDelimiter.length &&
				strMatchedDelimiter !== strDelimiter
			) {
				// Since we have reached a new row of data,
				// add an empty row to our data array.
				arrData.push([]);
			}

			var strMatchedValue;

			// Now that we have our delimiter out of the way,
			// let's check to see which kind of value we
			// captured (quoted or unquoted).
			if (arrMatches[2]) {
				// We found a quoted value. When we capture
				// this value, unescape any double quotes.
				strMatchedValue = arrMatches[2].replace(
					new RegExp('""', "g"),
					'"'
				);
			} else {
				// We found a non-quoted value.
				strMatchedValue = arrMatches[3];
			}

			// Now that we have our value string, let's add
			// it to the data array.
			arrData[arrData.length - 1].push(strMatchedValue);
		}

		// Return the parsed data.
		return arrData;
	}

	let data = await fetch(sheet);
	let csv = await data.text();
	var res = [];
	var parsed_data = CSVToArray(csv);
	var line = parsed_data[0];
	var colmap = {};
	parsed_data[0].forEach((key, c) => {
		colmap[c] = (key || "").trim().toLowerCase().replace(/ /gi, "_");
	});

	let rows = parsed_data
		.slice(1)
		.map((row, r) => {
			let ret = {};
			parsed_data[0].forEach((key, c) => {
				ret[key] = row[c] || "";
			});
			return ret;
		})
		.filter((row) => {
			return row.Enable;
		});

	let neighborhoods = new Set();
	let cuisines = new Set();


	rows.forEach(async (row, i) => {

		row._cuisines = row.Cuisine.replace(/\r?\n/, '   ').split('   ').map(line => line.trim()).filter(line => line).map(line => {
			cuisines.add(line);
			return line;
		})

		row._neighborhoods = row.Neighborhood.replace(/\r?\n/, '   ').split('   ').map(line => line.trim()).filter(line => line).map(line => {
			neighborhoods.add(line);
			return line;
		})

		row._slug = (row.Restaurant || "")
			.toLowerCase()
			.replace(/[^a-z0-9\-]/gi, "-")
			.replace(/\-\-/g, "-")
			.replace(/\-\-/g, "-")
			.replace(/\-$/, "");
		row._img = "";
		row._img_path = './public/assets/' + row._slug + ".jpg";
		if (!fs.existsSync(row._img_path)) {
			row["IG"] = (row["IG"] || "").trim();
			if (row["IG"]) {
				await fetchInsta(rows[i].IG, row);
			}
		} else {
			row._img = row._slug + ".jpg";
		}
	});

	neighborhoods = Array.from(neighborhoods);
	cuisines = Array.from(cuisines);

	return {
		rows: rows,
		cuisines: cuisines,
		neighborhoods: neighborhoods
	}
}

module.exports = getListings;
