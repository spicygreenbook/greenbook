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

    let PRISMICTOKEN = process.env.PRISMICTOKEN;
    console.log('prismic token', PRISMICTOKEN)
    var refs = await fetch(`https://spicygreenbook.cdn.prismic.io/api/v2?access_token=${PRISMICTOKEN}`);
    var refs_json = await refs.json();
    var master_ref;
    refs_json.refs.forEach(line => {
        console.log('ref', line);
        if(line.id === 'master') {
            //master_ref = line.ref;
        }
    })


    console.log('ref_id', ref_id)
    let _slug = ''
    if (ref_id && doc_id) {
        let url = `https://spicygreenbook.cdn.prismic.io/api/v2/documents/search?access_token=${PRISMICTOKEN}&ref=${ref_id}&q=%5B%5Bat(document.id%2C+"${doc_id}")%5D%5D`;
        console.log(url)
        var doc = await fetch(url);
        var doc_json = await doc.json();
        let doc_content = doc_json.results[0]

        var base_url = req.headers.host.indexOf('localhost:3000') > -1 ? 'http://localhost:3000' : 'https://spicygreenbook.com';
        if (doc_content.type === 'listing') {
            base_url += '/biz/' + doc_content._slug
        } else if (doc_content.type === 'content') {
            base_url += '/' + doc_content.uid
        } else if (doc_content.type === 'volunteer') {
            base_url += '/volunteers/' + doc_content.uid
        } else if (doc_content.type === 'home_page') {
            base_url += '/'
        }
        base_url += '?preview=' + ref_id;
        res.writeHead(302, {
          'Location': base_url
        });
        return res.end();

    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        return res.end(html)
    }


}
