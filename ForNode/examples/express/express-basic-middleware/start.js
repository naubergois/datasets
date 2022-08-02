const express = require("express");
const app = express();

app.listen(8080);

const router = express.Router();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//middleware example
app.use((req,res,next) =>{
  next()
})

router.get("/url", (req, res, next) => {  
  console.log("Request has just started");
});

app.use(router);