var express = require('express');
var Accident = require('../models').Accident;
var router = express.Router();

// middleware
var checkIDInput = function (req, res, next) {  
    if(isNaN(req.params.id)) {
        res.status(400).json('Invalid ID supplied');
    } else {
        next();
    }
};
var checkIDExist = function (req, res, next) {  
    //console.log('Check ID exist');
    Accident.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Accident not found');
        }
    }); 
};

router.get('/', function(req, res){
    Accident.findAll().then(accident => {
        res.status(200).json(accident);
    });
});

router.post('/', function(req, res){
    Accident.create({
        place: req.body.place,
        adate: req.body.adate,
        Car_VIN: req.body.Car_VIN
    }).then(accident => {
        res.status(200).json(accident);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    Accident.findById(req.params.id).then(accident => {

        res.status(200).json(accident);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    Accident.update({
        place: req.body.place,
        adate: req.body.adate,
        Car_VIN: req.body.Car_VIN
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    Accident.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;