var express = require('express');
var router = express.Router();
var user = require('../models/user');

router.post('/login', function (req, res) {
    console.log(req.body);
    user.loginUser(req.body.email, req.body.pwd).then(
        function(result) {
            console.log(result);
            res.json(result);
        }
    )
});

router.post('/register', function(req, res){
    console.log(req.body);
    user.registerUser(req.body.name, req.body.surname, req.body.u_class, req.body.email, 
        req.body.mobile_number, req.body.pwd).then(
        function(result) {
            console.log(result);
            res.json(result);
        }
    );
})

router.post('/',function(req,res) {
    console.log(req.body);
    user.findUser(req.body.email).then(
        function(result){ 
            console.log(result);
            res.json(result);
        }
    )
})

module.exports = router;