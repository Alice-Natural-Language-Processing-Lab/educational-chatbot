var express = require('express');
var router = express.Router();
var tests = require('../models/test');
var formula = require('../models/formula');
router.post('/', function (req, res) {

    console.log(req.body.queryResult.parameters.Formulae);
    if (req.body.queryResult.parameters.Formulae != undefined) {

        formula.getFormula(req.body.queryResult.parameters.Formulae).then(
            function (result) {
                res.json(result);
            }
        );
    } else {
        console.log(req.body.queryResult.parameters.Subject);
        tests.getTest(req.body.queryResult.parameters.Subject).then(
            function (result) {
                res.json(result);
            }
        )
    }
});

router.post('/submitTest', function(req, res) {
    console.log(req.body);
})



module.exports = router;