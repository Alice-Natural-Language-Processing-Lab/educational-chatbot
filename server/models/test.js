const conn = require('../dbConnection');

module.exports = {
    getTest: function (subject) {
        return new Promise(function (resolve, reject) {
            const sub = subject + '_QandA';
            console.log(sub);
            conn.collection(sub).aggregate([{
                $sample: {
                    size: 10
                }
            }]).sort({ qid: 1, difficulty: 1 }).toArray(function (err, result) {
                console.log(result);
                if (err) reject(-1);
                else resolve(result);
            })
        });
    },

    submitTest: function (val) {
        return new Promise(function (resolve, reject) {
            var obj = val;
            obj['date'] = new Date();
            conn.collection('tests').insertOne(obj, function (err, result) {
                if (err) {
                    // throw err;
                    reject(-1);
                }
                else {
                    resolve('Successful');
                }
            });

        })


    },

    viewStats: function (email) {
        return new Promise(function (resolve, reject) {
            const obj = {
                email: email
            };
            conn.collection('tests').find(obj).toArray(function (err, result) {
                if (err) {
                    reject(-1);
                } else {
                    resolve(result);
                }
            });

        });


    },
    reviewTest: function (testID) {
        return new Promise(function (resolve, reject) {
            const obj = {
                email: email
            };
            conn.collection('tests').find(obj).toArray(function (err, result) {
                if (err) {
                    reject(-1);
                } else {
                    resolve(result);
                }
            });

        });


    }


};