var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/minorProject";
var mongoose = require('mongoose');
mongoose.connect(url, { useNewUrlParser: true }).then(
    () => {
        console.log('connected tolocal  db');
    },
    (err) => {
        throw err;
    }
);
module.exports = mongoose.connection;