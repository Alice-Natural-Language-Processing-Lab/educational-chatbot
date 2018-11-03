const conn = require('../dbConnection');
const rp = require('request-promise');
const $ = require('cheerio');
module.exports = {
    getFormula: function (queryVal) {
        return new Promise(function (resolve, reject) {
            console.log("query value is " + queryVal);
            // conn.db("heroku_92150sf3");
            var ans = '';
            // Find all documents in the customers collection:
            conn.collection('test').find({
                topic: queryVal
            }).toArray(function (err, result) {
                if (err) throw err;
                if (result.length > 0) {
                    console.log(result);
                    console.log("Found");
                    ans = result[0].info;
                    console.log('result is :' + ans);
                    var obj = {
                        fulfillmentText: ans,
                        fulfillmentMessages: [{
                            card: {
                                title: "card title",
                                subtitle: "card text",
                                imageUri: "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                                buttons: [{
                                    text: "button text",
                                    postback: "https://assistant.google.com/"
                                }]
                            }
                        }],
                        source: "example.com",
                        payload: {
                            google: {
                                expectUserResponse: true,
                                richResponse: {
                                    items: [{
                                        simpleResponse: {
                                            textToSpeech: "this is a simple response"
                                        }
                                    }]
                                }
                            }
                        }
                    };
                    resolve(obj);
                } else {
                    console.log("Not Found");
                    var url = "https://www.google.co.in/search?q=" + queryVal + "&oq=" + queryVal;
                    rp(url)
                        .then(function (html) {
                            console.log($('div > div > div > div > span', html).text());
                            const info = $('div > div > div > div > span', html).text();
                            const obj = {
                                topic: queryVal,
                                info: info
                            };
                            ans = info;
                            console.log('ans is  ' + ans);
                            conn.collection("test").insertOne(obj, function (err, res) {
                                if (err) {
                                    reject(-1);
                                }

                            });
                            var obj1 = {
                                fulfillmentText: info,
                                fulfillmentMessages: [{
                                    card: {
                                        title: "card title",
                                        subtitle: "card text",
                                        imageUri: "https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png",
                                        buttons: [{
                                            text: "button text",
                                            postback: "https://assistant.google.com/"
                                        }]
                                    }
                                }],
                                source: "example.com",
                                payload: {
                                    google: {
                                        expectUserResponse: true,
                                        richResponse: {
                                            items: [{
                                                simpleResponse: {
                                                    textToSpeech: "this is a simple response"
                                                }
                                            }]
                                        }
                                    }
                                }
                            };
                            resolve(obj1);
                        });
                }
            })
        });
        // var queryVal = req.body.queryResult.parameters.Formulae;

    }
}