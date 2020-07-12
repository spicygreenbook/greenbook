/*
accepts a query and attempts to return a geolocation
*/

const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_ACCESSKEY_SECRET
});

var docClient = new AWS.DynamoDB.DocumentClient();

async function handler(req, res) {

    const tableName = "geocache";

    var params = {
        TableName:tableName,
        Item:{
            "query": "yolo time",
            "geocoordinates": [1223432,23421231]
        }
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });

    res.statusCode = 200;
    return res.json({error: 'sup'});
}

module.exports = handler;
