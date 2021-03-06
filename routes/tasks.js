var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://poolUser:poolUser@ds245357.mlab.com:45357/pooling_module',['users','activeRides']);

//Get all users
router.get('/users',function(req,res,next){
    db.users.find(function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});

//Get one user
router.get('/user/:id',function(req,res,next){
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)},function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});

router.delete('/user/:id',function(req,res,next){
    db.users.remove({_id: mongojs.ObjectId(req.params.id)},function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});


//Get all Rides
router.get('/rides',function(req,res,next){
    db.activeRides.find(function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});

router.get('/ride/:id',function(req,res,next){
    console.log(req.params.id);
    let rideId = Number(req.params.id);
    db.activeRides.find({id : rideId},function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});

router.delete('/ride/:id',function(req,res,next){
    db.activeRides.remove({_id: mongojs.ObjectId(req.params.id)},function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
});

router.post('/ride',function(req,res){
    let ride = req.body;
    db.activeRides.save(ride, function(err,task){
        if(err){
            res.send(err);
        }
        res.json(ride);
    });
});

router.put('/countUpdate/:id',function(req,res,next){
    let rideId = Number(req.params.id);
    var ride = req.body;
    var updRide = ride;
    updRide.free_seats = ride.free_seats -1 ;
    db.activeRides.update({id: rideId},updRide,{},function(err,docs){
        if(err){
            res.send(err);
        }
        res.json(docs);
    });
    
});


module.exports = router;