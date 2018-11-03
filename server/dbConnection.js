var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_xls4s4v4:9kpoakv5i5pvn29mtu5rurqt0u@ds145573.mlab.com:45573/heroku_xls4s4v4";
var mongoose = require('mongoose');
// MongoClient.connect(url,{ useNewUrlParser: true } ,function(err, db) {
//     if (err) throw err;
//     else 
//     console.log("Connected"); 
//     // console.log(db);
//     module.exports = db;    
//   });
mongoose.connect(url, { useNewUrlParser: true }).then(
    () => {
        console.log('connected to db');
    },
    (err)=> {
        throw err;
    }
);
module.exports = mongoose.connection;
// module.exports = conn