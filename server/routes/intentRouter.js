var express = require('express');
var router = express.Router();
const ps = require('python-shell');
const path = require('path');
const pathToPython = path.join(__dirname,'../../python/classificationOfIntents.py');


router.post('/',async (req, res) => {
    const query= req.body.intent;
    const options = {
        args: [
            query
        ]
    };
    console.log(pathToPython)
    await ps.PythonShell.run(pathToPython, options, async (err, data) => {

        if (err) {
            console.log(err);
        }
        console.log(data);
        console.log('I am inside the python shell!');
        res.json('okay');
    });
})

module.exports = router;