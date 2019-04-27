var express = require('express');
var router = express.Router();
const ps = require('python-shell');
const path = require('path');
const pathToPython = path.join(__dirname,'../../python/classificationOfIntents.py');
const pathToPython2 = path.join(__dirname,'../../python/ner.py');
const localConnect = require('../localDbConn');
router.post('/',async (req, res) => {
    const query= req.body.intent;
    const options = {
        args: [
            query
        ]
    };
    await ps.PythonShell.run(pathToPython, options, async (err, data) => {
        console.log('I am inside the python shell1!');
        if (err) {
            console.log(err);
        }
        len = data.length;
        console.log(data);
        action = data[len -1];
        console.log(action);
        const responseObj ={
            type: action
        }
        if (action== 'Motivation')
            responseObj.value = 'Brighten up. Watch this motivating video';
        if (action== 'Query') {
            el = data[len-3];
            localConnect.collection('key-values').findOne ({
                query : el[el.length -1 ]
            },(err,result)=>{
                if(err)
                    console.log(err);
                console.log(result);
            })
        }
        if (action == 'Reminder') {
            el = data[len-2];
            const obj = {
                useremail: req.body.email,
                val: ' give a test on' + el
            }
            localConnect.collection('reminders').insert ({
               obj
            },(err,result)=>{
                if(err)
                    console.log(err);
                console.log(result);
            })
        }
        
    });
})

module.exports = router;