


var products = {
'id_A': {
name: 'Product A'
,
price: 30
},
'id_B': {
name: 'Product B'
,
price: 50
}
};

var express = require('express');

var app = express();


app.post('/', function(req, res) {
var entry, id, response;

console.log(req);
if (req.query.name && req.query.price) {
id = req.query.id;
entry = {};
entry[id] = {
id : id,
name: req.query.name, price: req.query.price };
products[id] = entry[id];
response = {
code: 201,
message: 'created product',
products: [entry]
}; } else {
response = {
code: 1000,
message: 'missing parameter. required: name, price.' }
}
res.json(response); });




app.get('/', function(req, res) {
var productArray =
Object.keys(products).map(function(key) {
var entry = products[key];
entry.id = key;
return entry;
});
var response = {
code: 200,
products: productArray
};
res.json(response);
});

var server = app.listen(3000, function () {
var host = server.address().address;
var port = server.address().port;
console.log('app listening at http://%s:%s',
host, port)
});
