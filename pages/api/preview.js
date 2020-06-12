import { getListings } from "../../utils/getListings";

//https://spicygreenbook.prismic.io/previews/session/draft?previewId=XuMBYBAAACIAYOLV&document=Xt-jrBAAACIAUqu6&version=XuMLCBAAACMAYQ3l

let html = `
<html>
<head>
<body>
<script>
  window.prismic = {
    endpoint: 'https://spicygreenbook.cdn.prismic.io/api/v2'
  };
</script>
<script type="text/javascript" src="https://static.cdn.prismic.io/prismic.min.js?new=true"></script>
Generating preview....
</body>
</html>
`

module.exports = async (req, res) => {
    const qs = require('querystring');
    let parsed = qs.parse(req.url.split('?')[1] || '');
    console.log('parsed', parsed)
    let ref_id = parsed.token.split('/previews/')[1].split('?')[0];
    if (ref_id.indexOf(':') > -1){
        //ref_id = ref_id.split(':')[1];
    }
    let doc_id = parsed.documentId;
    console.log('ref_id', ref_id)
    let _slug = ''
    if (ref_id && doc_id) {

        let data = await getListings({ref_id: ref_id});
        if (data && data.listings) {
            data.listings.forEach(listing => {
                if(listing.id == doc_id)  {
                    //console.log('we got a match', listing)
                    _slug = listing._slug;
                }
            })
        }

        console.log(Object.keys(req));
        //let base_url = req.hostname;
        var base_url = req.headers.host.indexOf('localhost:3000') > -1 ? 'http://localhost:3000' : 'https://spicygreenbook.com';
        res.writeHead(302, {
          'Location': base_url + '/biz/' + _slug  + '?preview=' + ref_id
        });
        return res.end();
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        return res.end(html)
    }


}
