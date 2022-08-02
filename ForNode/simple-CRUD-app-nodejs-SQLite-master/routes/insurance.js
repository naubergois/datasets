var express = require('express');
var Insurance = require('../models').Insurance;
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
    Insurance.count({ where: { id: req.params.id } }).then(count => {
        if (count != 0) {
            next();
        } else {
            res.status(400).json('Insurance not found');
        }
    }); 
};

router.get('/', function(req, res){
    Insurance.findAll().then(insurance => {
        res.status(200).json(insurance);
    });
});

router.post('/', function(req, res){
    Insurance.create({
        price: req.body.price,
        expiration_date: req.body.expiration_date,
        paymanet_date: req.body.paymanet_date,
        InsuranceCompany_company_name: req.body.InsuranceCompany_company_name
    }).then(insurance => {
        res.status(200).json(insurance);
    }).error(err => {
        res.status(405).json('Error has occured');
    });
});

router.get('/:id', [checkIDInput, checkIDExist], function(req, res){
    Insurance.findById(req.params.id).then(insurance => {

        res.status(200).json(insurance);
    });
});

router.put('/:id', [checkIDInput, checkIDExist], function(req, res){
    Insurance.update({
        price: req.body.price,
        expiration_date: req.body.expiration_date,
        paymanet_date: req.body.paymanet_date,
        InsuranceCompany_company_name: req.body.InsuranceCompany_company_name
    },{
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

router.delete('/:id', [checkIDInput, checkIDExist], function(req, res){
    Insurance.destroy({
        where: { id: req.params.id }
    }).then(result => {
        res.status(200).json(result);
    });
});

module.exports = router;