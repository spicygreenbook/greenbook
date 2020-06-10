
const getPrismicGroup = (ref, key) => {
	//console.log('ref', ref, 'key', key)
	if (ref[key] && ref[key].type === 'Text') {
		return ref[key].value
	} else if (ref[key] && ref[key].type === 'Image') {
		if (ref[key].value.main.url) {
			return {
				width: ref[key].value.main.dimensions.width,
				height: ref[key].value.main.dimensions.height,
				url: ref[key].value.main.url
			}
		} else {
			return null
		}
	}
}

const getPrismicValue = (ref, key) => {
	if (ref) {
		if (ref.type === 'StructuredText') {
			return ref.value.map(line => line.text)
		} else if (ref.type === 'Text') {
			return Array.isArray(ref.value) ? ref.value.map(line => line.text).join('') : ref.value
		} else if (ref.type === 'Link.web') {
			return ref.value.url
		} else if (ref.type === 'GeoPoint') {
			return {
				lat: ref.value.latitude,
				lng: ref.value.longitude
			}
		} else if(ref.type === 'Image') {
			return {
				width: ref.value.main.dimensions.width,
				height: ref.value.main.dimensions.height,
				url: ref.value.main.url
			}
		} else if(ref.type === 'Group') {
			return ref.value.map(item => {
				return getPrismicGroup(item, key)
			}).filter(item => item)
		}
	} else {
		console.log('tried passing empty ref', ref, 'with key', key)
	}
	return '';
}

async function getListings(config) {
	var masterRef = await fetch('https://spicygreenbook.prismic.io/api/v2');
	var masterRef_json = await masterRef.json();
	var master_ref;
	masterRef_json.refs.forEach(line => {
		if(line.id === 'master') {
			master_ref = line.ref;
		}
	})

	var url = 'https://spicygreenbook.prismic.io/api/v1/documents/search?ref='+master_ref+'&q=%5B%5Bat(document.type%2C+%22listing%22)%5D%5D#format=json';
	let data = await fetch(url);
	let parsed_data = await data.json();

	let allCuisines = new Set();

	let listings = parsed_data.results.map((doc, i) => {

		let images = getPrismicValue(doc.data.listing.images, 'image');
		let primary_image = getPrismicValue(doc.data.listing.primary_image);
		images = (primary_image ? [primary_image] : []).concat(images ? images : []);

		let cuisines = getPrismicValue(doc.data.listing.cuisines, 'cuisine');
		cuisines.forEach(cuisine => {
			allCuisines.add(cuisines);
		})

		return {
			_slug: doc.uid,
			_singleRef: doc.href,
			name: getPrismicValue(doc.data.listing.name),
			primary_image: primary_image,
			cuisines: cuisines,
			//services: getPrismicValue(doc.data.listing.services, 'service'),
			phone_number: getPrismicValue(doc.data.listing.phone_number),
			yelp_link: getPrismicValue(doc.data.listing.yelp_link),
			hours: getPrismicValue(doc.data.listing.hours),
			website_url: getPrismicValue(doc.data.listing.website_url),
			instagram: getPrismicValue(doc.data.listing.instagram),
			geocoordinates: getPrismicValue(doc.data.listing.geocoordinates),
			address: getPrismicValue(doc.data.listing.address),
			description: getPrismicValue(doc.data.listing.description),
			images: images
		}
	})

	return {
		listings: listings,
		cuisines: Array.from(cuisines)
		//cuisines: cuisines,
		//neighborhoods: neighborhoods
	}
}

async function getContent(config) {
	var masterRef = await fetch('https://spicygreenbook.prismic.io/api/v2');
	var masterRef_json = await masterRef.json();
	var master_ref;
	masterRef_json.refs.forEach(line => {
		if(line.id === 'master') {
			master_ref = line.ref;
		}
	})

	var url = `https://spicygreenbook.prismic.io/api/v1/documents/search?ref=${master_ref}&q=%5B%5Bat(document.type%2C+%22${config.type}%22)%5D%5D`;
	let data = await fetch(url);
	let parsed_data = await data.json();

	let content = {};
	let listings = parsed_data.results.map((doc, i) => {
		if (config.type === 'home_page' && doc.data.home_page) {
			Object.keys(doc.data.home_page).forEach(key => {
				content[key] = getPrismicValue(doc.data.home_page[key], key);
			})
		}
	})

	return {
		content
	}
}

module.exports = {
	getListings: getListings,
	getContent: getContent
}
