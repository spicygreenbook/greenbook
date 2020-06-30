const { getListings } = require("./utils/getListings");
const  generateSiteMap = require("./utils/generateSiteMap");

async function handle () {
    let data = await getListings({});
    let sitemap = await generateSiteMap(data);
    return {}
}


module.exports = {
    generaiteSiteMap: handle()
}