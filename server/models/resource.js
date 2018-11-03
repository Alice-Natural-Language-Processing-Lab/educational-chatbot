const conn = require('../dbConnection');
module.exports = {

    getResource: function () {
        return new Promise(function (resolve, reject) {
            conn.collection('resources').find({}).toArray( function (err, result) {
                if (err) {
                    // throw err;
                    reject(-1);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
