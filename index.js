var express = require('express');

var app = express();

app.get('/test', function(req, res){
   res.send(`status:${res.statusCode}, message:"ok"`);
});

app.get('/time', function(req, res){
    let date=new Date();
    let time=`${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
    res.send(`status:${res.statusCode}, message: ${time}`);
 });
 app.get('/hello/:id', function(req, res){
     let id= req.params.id;
    res.send(`status:${res.statusCode}, message: hello ${id}`);
 });
 app.get('/hello', function(req, res){
   res.send(`status:${res.statusCode}, message: hello`);
});
app.get('/search', function(req, res){
    let search=  req.query.s;
    if (search) {
        res.status(200).json( `status: ${res.statusCode}, message: 'ok', data: ${search} `);
      } else {
        res.status(500).json(` status: ${res.statusCode}, error: true, message: 'you have to provide a search`);
      }
});


app.listen(8080);

