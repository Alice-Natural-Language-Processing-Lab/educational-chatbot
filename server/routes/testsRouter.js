var express = require('express');
var router = express.Router();
var tests = require('../models/test');

router.post('/', function(req, res){
  console.log(req.header);  
  tests.getTest(req.body.subject).then(
    function(result){
      console.log(result);
      res.json(result);
    }
  )
});

router.post('/submit', function(req, res){
  console.log('Submit tests');
  console.log(req.body);
  tests.submitTest(req.body).then(
    function(status) {
        console.log(status);
        res.json(status);
    }
  )
})

router.post('/stats',function(req,res){
  console.log(req.body.email);
  tests.viewStats(req.body.email).then(
    function(result) {
      console.log(result);
      res.json(result);
    }
  )
})

module.exports = router;