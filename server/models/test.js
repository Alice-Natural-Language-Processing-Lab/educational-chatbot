const conn = require('../dbConnection');

module.exports = {
    getTest: function (subject) {
        return new Promise(function (resolve, reject) {
            const sub = subject + '_QandA';
            console.log(sub);
            conn.collection(sub).aggregate([{
                $sample: {
                    size: 3
                }
            }]).sort({qid: 1}).toArray(function (err, result) {
                console.log(result);
                if (err) reject(-1);
                else resolve(result);
            })
        });
    },

    submitTest: function(val) {
        return new Promise(function(resolve, reject) {
            console.log(val);
            console.log(val.subject);
            test = val.quests;
            var total = test.length;
            var score = 0;
            for (varb of test)
            {
                if(varb.answer===varb.response)
                    score++;

            }

            var data = {total: total, score: score, subject:val.subject,userEmail:val.userEmail};
            data['date'] = new Date();
            console.log(data);
            conn.collection('stats').insertOne(data, function (err, result) {
                if (err) {
                    // throw err;
                    reject(-1);
                }
                else {
                    resolve(data);
                }
            });
           
        })
            

    },
    viewStats: function(email) {
        return new Promise(function(resolve, reject) {
            const obj = {
                userEmail: email
            };
            conn.collection('stats').find(obj).toArray(function (err, result) {
                if (err) {
                    reject(-1);
                } else{
                  resolve(result); 
                }
            });
           
        });
            

    }

};