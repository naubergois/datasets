


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
