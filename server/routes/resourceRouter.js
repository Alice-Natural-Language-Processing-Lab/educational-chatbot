var express = require('express');
var router = express.Router();
var resource = require('../models/resource');

router.get('/',function(req,res){
    resource.getResource().then(
        function(results){
            console.log(results);
            res.json(results);
        }
    )
})

module.exports = router;