var express = require('express');
var router = express.Router();
var models = require("../models");

router.get('/:id', function(req, res, next){
    res.send('test');
});

router.post('/new', function(req, res){
    res.send('New task request accepted!');
});

module.exports = router;