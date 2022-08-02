var express = require('express');
var Client = require('../models').Client;
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
    Client.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Client not found');
        }
    }); 
};

router.get('/', function(req, res){
    Client.findAll().then(client => {
        res.status(200).json(client);
    });
});

router.post('/', function(req, res){
    Client.create({
        ssn: req.body.ssn,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    }).then(client => {
        res.status(200).json(client);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    Client.findById(req.params.id).then(client => {

        res.status(200).json(client);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    Client.update({
        ssn: req.body.ssn,
        first_name: req.body.first_name,
        last_name: req.body.last_name
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    Client.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;