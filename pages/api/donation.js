module.exports = async (req, res) => {

    let json = {};
    let error = '';
    try {
        json = JSON.parse(req.body);
        console.log('json is', json);
    } catch(e) {
        error = 'invalid request'
    }

    try {
        const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1477, // $14.77, an easily identifiable amount
            currency: "usd",
        });

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end(JSON.stringify({
            accepted: true,
            json: json
        }));
    } catch (err) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        return res.end({error: err.message});
    }
};
