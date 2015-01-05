var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var BSON = mongo.BSONPure;

/* GET Matches page. */
router.get('/', function(req, res) {
    var db = req.db;
    var collection = db.get('Matches');
    //res.render('matches', { title: 'Matches' });

    collection.find({},{},function(e,docs){
        res.render('matches', {
            "matches" : docs
        });
    });
});

router.get('/getById', function(req, res) {
    var db = req.db;
    var collection = db.get('Matches');

    collection.find({'_id' : req.query.id},{},function(e,doc){
        res.send(doc);
    });
});

router.get('/deleteById', function(req, res) {
    var db = req.db;
    var collection = db.get('Matches');

    collection.remove({'_id' : req.query.id},function(e,doc){
       res.redirect("/matches");
    });
});

router.post('/updateById', function(req, res) {
    var db = req.db;
    var collection = db.get('Matches');
    console.log(req.body.id + " " + req.body.match);

    collection.update({'_id':new BSON.ObjectID(req.body.id)},JSON.parse(req.body.match),function(e,doc){
        if(e)
        	console.log("error in update" + e)
        else
        	res.send("ok");
    });
});

router.get('/newmatch', function(req, res) {
  res.render('newmatch', { title: 'Create New Match' });
});

/* POST to Add User Service */
router.post('/addmatch', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var home = req.body.home;
    var opponent = req.body.opponent;

    // Set our collection
    var collection = db.get('Matches');

    // Submit to the DB
    collection.insert({
        "name" : home + " vs. " + opponent,
        "home" : home,
        "opponent" : opponent,
        "sets" : []
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /addmatch
            //res.location("/matches");
            // And forward to success page
            res.redirect("/matches");
        }
    });
});

module.exports = router;
