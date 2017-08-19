var express = require('express');
var router = express.Router();
var models = require("../models");
var randomstring = require("randomstring");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({extended: false});

function loggedIn(req, res, next) {
    console.log(req.sessionID);
    req.session.reload(function () {
        if (req.session.uuid) {
            next();
        } else {
            res.redirect('/');
        }
    });
}

router.all('*', loggedIn, function (req, res, next) {
    next();
});

var randomString = require('randomstring');

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({extended: false});





router.post('/', function (req, res, next) {
    console.log(req.body);
    var calendar = {
        calendarName: req.body.calendarName,
        calendarDescription: req.body.calendarDescription,
        calendarOwner: req.session.uuid,
        calendarId: randomstring.generate(7)
    };
    models.calendar.create(calendar).then(function (res) {
        var calendarUsers = req.body.users.map(function (user) {
            var users = {
                calendarUserEmail: user,
                calendarID: res.dataValues.calendarId
            };
            return users;
        });
        calendarUsers.push({
            calendarUserEmail: req.session.email,
            calendarUserUUID: req.session.uuid,
            verified: true,
            isOwner: true,
            calendarID: res.dataValues.calendarId
        });

        models.calendarUser.bulkCreate(calendarUsers).then(function (userResult) {
            return models.calendarUser.findAll();
        }).then(function (returnUsers) {
            console.log(returnUsers);
        });
    });
    }
});

// <<<<<<< HEAD



// =======
//get all calendars
router.get('/:id', function (req, res, next) {
      //return specific user
      models.calendar.findOne({
          where: {
              id: req.params.id,
          }
      }).then(function (calData) {
          // res.json(dbUser);
          res.render("calendar.hbs", {layout: "calendar.hbs", data: calData});
      }).catch(function (err) {
          catchErr(err);
      });
>>>>>>> 34de67f1631ac964e9207bdac377605edad859e8
});
//>>>>>>> upstream/master

<<<<<<< HEAD
router.get('/', function (req, res, next) {
    var cal = [];
    var uncal = [];
    models.calendarUser.findAll({
        include: [
            {
                model: models.calendar,
                as: 'calendars',
                attributes: {
                    exclude: ['calendarOwner']
                }
            }
        ],
        attributes: {
            include: ['isOwner', 'verified'],
            exclude: ['calendarUserUUID', 'calendarUserEmail', 'id', 'calendarID']
        },
        where: {
            calendarUserEmail: req.session.email
        },
        raw: true
    }).then(function (results) {
        for(var i = 0; i < results.length; i++){
            if(results[i].verified){
                cal.push({
                    isOwner: results[i].isOwner,
                    id: results[i]['calendars.calendarId'],
                    name: results[i]['calendars.calendarName'],
                    description: results[i]['calendars.calendarDescription']
                })
            } else {
                uncal.push({
                    id: results[i]['calendars.calendarId'],
                    name: results[i]['calendars.calendarName'],
                    description: results[i]['calendars.calendarDescription']
                })
            }
        }
        console.log(cal, uncal);
        res.render('newCalendar.hbs', {
            cal: cal,
            uncal: uncal
        });
    });
});

router.get('/join/:id', function (req, res, next) {
    console.log(req.params.id);
    models.calendarUser.findOne({
        where: {
            calendarID: req.params.id,
            calendarUserEmail: req.session.email
        },
        raw: true
    }).then(function (result) {
        console.log(result);
        if (!result.verified) {
            models.calendarUser.update({
                verified: true,
                calendarUserUUID: req.session.uuid
            }, {
                where: {
                    calendarID: req.params.id,
                    calendarUserEmail: req.session.email
                }
            });
        }
        next();
    });
});
=======

router.post('/api/calendar', jsonParser, function(req, res, next){

  var newCalendar = {};
  var rando = randomstring.generate(3);
  console.log("RANDO NUMBER: " + rando);
  var trimmedCalName = req.body.calendarName.trim();

  newCalendar.calendarID = trimmedCalName.replace(/\s/g,'') + "_" + rando;
  newCalendar.calendarName = trimmedCalName;
  newCalendar.calendarDescription = req.body.calendarDescription;
  newCalendar.calendarOwner = "";

  //popluate calendarUser table
  var newCalInfo = {};
  newCalInfo.calID = newCalendar.calendarID;
  newCalInfo.memberEmails = req.body.memberEmails;// make changes so  this matches new input style from html (calendar memeber emails only)

  var numberOfLoops = newCalInfo.memberEmails.length;

  //======console log checks==============
  console.log("number of loops: " + numberOfLoops);
  console.log("newCalendar: " + newCalendar);
  console.log("newCalInfo" + newCalInfo);
  //======================================
  controlQuery(newCalInfo, createCal, numberOfLoops, 0, function(data){
    res.send(data);
  });

});//--router.post--



function controlQuery(newCalInfo, fnToCallWhenDone, numberOfLoops, zero, dbResponse){
  console.log("controlQuery activated!");

  if (numberOfLoops === 0) {
    return fnToCallWhenDone(newCalendar, function(cb){
      dbResponse(cb);
    });
  }
  findUserInfo(newCalInfo, zero, function whenDone(result){
    console.log("whenDone activated!!! " + result);
    if (zero === 0) {
      newCalendar.calendarOwner = result.globalUserUUID;//TODO where is the info used?
    }
    controlQuery(newCalInfo, fnToCallWhenDone, numberOfLoops - 1, zero ++);
  });
}//--controlQuery--



function findUserInfo(newCalInfo, zero, cb){
  console.log("findUserInfo activated. loop: " + zero);
  var calData = {};
  calData.calendarID = newCalInfo.calID;
  calData.memberEmail = newCalInfo.memberEmails[zero];
  var query = {};
  query.globalUserEmail = newCalInfo.memberEmails[zero];
  models.globalUser.findOne({
    where: query
  })
  .then(function(result){
    console.log("");
    console.log(result.dataValues);
    console.log("findUserInfo database query complete");

    if (result) {
      console.log("result TRUE " + result);
      cb(result);
      calData.verified = true;
      calData.calendarUserUUID = result.globalUserUUID;
      populateCalendarUser(calData);
    } else {
      console.log("result FALSE " + result);
      populateCalendarUser(calData);
    }

  })
  .catch(function(err){
    catchErr(err);
  });
}//--findUserInfo--
>>>>>>> 34de67f1631ac964e9207bdac377605edad859e8

router.get('/join/:calendarID', function (req, res, next) {
    console.log(req.params, "thing");
    models.calendar.findOne({
        where: {
            calendarId: req.params.calendarID
        },
        attributes: {
            exclude: ['calendarOwner']},
        raw: true
    }).then(function (result) {
        console.log(result);
    });


<<<<<<< HEAD
    models.calendarUser.findAll({
        where: {
            verified: true,
            calendarID: req.params.calendarID
        },
        attributes: {
            exclude: ['id', 'calendarUserEmail', 'calendarID', 'verified', 'isOwner']
        },
        raw: true
    }).then(function (calendarUsers) {
        var queryFor = calendarUsers.map(function(uuid){
            return {uuid: uuid.calendarUserUUID};
        });
        console.log(queryFor);
=======
function populateCalendarUser(calData){
  console.log("populateCalendarUser activated!!");
  models.calendarUser.create(calData)
  .then(function(result){
    console.log("Calendar ID and corresponding User have been added to database");
  }).catch(function(err){
    catchErr(err);
  });
}


function createCal(newCalendar, cb){
  console.log("createCal activated!!!!");
  models.calendar.create(newCalendar)
  .then(function(dbCal){
    console.log("new calendar created and added to database");
    cb(dbCal);
  }).catch(function(err){
    catchErr(err.Error);
  });
}
>>>>>>> 34de67f1631ac964e9207bdac377605edad859e8

        models.sequelize.models.User.findAll({
            where: {
                $or: queryFor
            },
            attributes: {
                exclude: ['uuid', 'id', 'username', 'hash', 'salt', 'activationKey', 'resetPasswordKey', 'verified', 'createdAt', 'updatedAt']
            },
            raw: true
        }).then(function(users){
            console.log(users);
        })
    })
});

//displays error if one occurs
<<<<<<< HEAD
function catchErr(err) {
    console.log("");
    console.log("~~~ERROR~~~ERROR~~~ERROR~~~ERROR~~~ERROR~~~ERROR~~~ERROR~~~ERROR~~~");

    console.log("\n sequelize error: \n" + err.SequelizeValidationError);
=======
function catchErr(err){
  console.log("");
  console.log("~~~ERROR~~~ERROR~~~ERROR~~~ERROR~~~ERROR~~~ERROR~~~ERROR~~~ERROR~~~");
//<<<<<<< HEAD
  console.log(err.Error);
//=======

  console.log("\n sequelize error: \n" + err.SequelizeValidationError);
//>>>>>>> upstream/master
>>>>>>> 34de67f1631ac964e9207bdac377605edad859e8
}

module.exports = router;
