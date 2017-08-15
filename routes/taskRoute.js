var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/:id', function(req, res, next){
    res.send('test');
});

router.post('/new', function(req, res){
	// db.Task.create(
	// {
	// 	taskCalendar: req.body.newTask.taskCalendar,
	// 	taskName: req.body.newTask.taskName,
	// 	taskDate: req.body.newTask.taskDate,
	// 	taskDescription: req.body.newTask.taskDescription,
	// 	taskRequester: req.body.newTask.taskRequester
	// })
	db.Task.create(
	{
		taskCalendar: 5,
		taskName: "test task",
		taskDate: "2017-08-01T12:00:00",
		taskDescription: "blah",
		taskRequester: 1
	})
	.then(function(data) {
	    res.send('New task request accepted!');
	})
	.catch(function(err) {
		console.log(err);
	});
});

module.exports = router;