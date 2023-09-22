var express = require('express');

var app = express();


const movies = [
    { title: 'Jaws', year: 1975, rating: 8, id: 1},
    { title: 'Avatar', year: 2009, rating: 7.8 , id: 2},
    { title: 'Brazil', year: 1985, rating: 8 , id: 3},
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 , id: 4}
]



console.log(movies);
app.get('/test', function(req, res){
   res.send(`status:${res.statusCode}, message:"ok"`);
});

app.get('/time', function(req, res){
    let date=new Date();
    let time=`${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`
    res.status(200).send(`status:${res.statusCode}, message: ${time}`);
 });

 app.get('/hello/:id', function(req, res){
     let id= req.params.id;
    res.status(200).send(`status:${res.statusCode}, message: hello ${id}`);
 });

 app.get('/hello', function(req, res){
   res.send(`status:${res.statusCode}, message: hello`);
});

app.get('/search', function(req, res){
    let search=  req.query.s;
    if (search) {
        res.status(200).send( `status: ${res.statusCode}, message: 'ok', data: ${search} `);
      } else {
        res.status(500).send(` status: ${res.statusCode}, error: true, message: 'you have to provide a search`);
      }
});

app.get('/movies/add', function(req, res){
   let addTittle = req.query.tittle
   let addYear = req.query.year
   let addRating = req.query.rating??4
   if (!addTittle || !addYear){
     res.status(403).send(` status: ${res.statusCode}, error: true, message: 'you have to provide a tittle and a year'`);
   }else
   movies.push({title: addTittle, year: addYear, rating: addRating, id: movies.length + 1})
    res.status(200).send(`status:${res.statusCode}`);
 });

 app.get('/movies/get', function(req, res){
    const response = {
      status: res.statusCode,
      data: movies
    }
    res.send(response);
 });
 app.get('/movies/edit', function(req, res){
    res.status(200).send(`status:${res.statusCode}, message: anything`);
 });
 app.get('/movies/delete', function(req, res){
   res.status(200).send(`status:${res.statusCode}, message: anything`);
 });

 app.get('/movies/get/by-date', function(req, res){
   movies.sort((a, b)=>{return a.year - b.year})
   const response = {
      statues: res.statusCode,
      data : movies
   }
   res.status(200).send(response);
 });

 app.get('/movies/get/by-rating', function(req, res){
   movies.sort((a, b)=>{return b.rating - a.rating})
   const response = {
      statues: res.statusCode,
      data : movies
   }
   res.status(200).send(response);
 });

 app.get('/movies/get/by-tittle', function(req, res){
   movies.sort((a, b)=>{  if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;if (a.title.toLowerCase() > b.title.toLowerCase()) return 1; return 0;})
   const response = {
      statues: res.statusCode,
      data : movies
   }
   res.status(200).send(response);
 });
 

app.get('/movies/get/id/:id', function(req, res){
   let id= parseInt(req.params.id);
   let movie= movies.find((movie)=> movie.id === id);
   if (!movie) {
      res.statues(404).send(`statues:${res.statusCode}, message: the movie ${id} does not exist,`,);
    } else {
      res.send(movie);
    }
});



app.listen(8080);
