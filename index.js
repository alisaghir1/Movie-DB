var express = require('express');

var app = express();

app.get('/test', function(req, res){
   res.send(`{status:${res.statusCode}, message:"ok"}`);
});

app.get('/time', function(req, res){
    let date=new Date();
    let time=`${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
    res.send(`{status:${res.statusCode}, message: ${time}}`);
 });

app.listen(8080);

