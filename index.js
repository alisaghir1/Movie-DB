var express = require('express');

var app = express();

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]



console.log(movies);
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
app.get('/movies/add', function(req, res){
    res.send(`status:${res.statusCode}, message: anything`);
 });
 app.get('/movies/get', function(req, res){
    res.send(`status:${res.statusCode}, message: ${movies.map(e=>{return ` title: ${e.title}, year: ${e.year},rating: ${e.rating} ||`})}`);
 });
 app.get('/movies/edit', function(req, res){
    res.send(`status:${res.statusCode}, message: anything`);
 });
 app.get('/movies/delete', function(req, res){
    res.send(`status:${res.statusCode}, message: anything`);
 });
 app.get('/movies/get/by-date', function(req, res){
   res.send(`status:${res.statusCode}, message: ${movies.sort((a, b)=>{return a.year - b.year}).map(e=>{return ` title: ${e.title}, year: ${e.year},rating: ${e.rating} ||`})}`);
});
app.get('/movies/get/by-rating', function(req, res){
   res.send(`status:${res.statusCode}, message: ${movies.sort((a, b)=>{return b.rating - a.rating}).map(e=>{return ` title: ${e.title}, year: ${e.year},rating: ${e.rating} ||`})}`);
});
app.get('/movies/get/by-title', function(req, res){
   res.send(`status:${res.statusCode}, message: ${movies.sort((a, b)=>{  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;if (a.title.toLowerCase() > b.title.toLowerCase()) return 1; return 0;}).map(e=>{return ` title: ${e.title}, year: ${e.year},rating: ${e.rating} ||`})}`);
});



app.listen(8080);

