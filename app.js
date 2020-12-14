const express =require('express');
const bodyParser = require("bodyParser");
const request= require ("request");




const app=express();
app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});


app.listen(3000,function(){

});
