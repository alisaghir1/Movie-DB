var express = require('express');

var app = express();

const movies = [
  { title: 'Jaws', year: 1975, rating: 8, id: 1 },
  { title: 'Avatar', year: 2009, rating: 7.8, id: 2 },
  { title: 'Brazil', year: 1985, rating: 8, id: 3 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2, id: 4 },
];

console.log(movies);
app.get('/api/test', function (req, res) {
  res.send(`status:${res.statusCode}, message:"ok"`);
});

app.get('/api/time', function (req, res) {
  let date = new Date();
  let time = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;
  res.status(200).send(`status:${res.statusCode}, message: ${time}`);
});

app.get('/api/hello/:id', function (req, res) {
  let id = req.params.id;
  res.status(200).send(`status:${res.statusCode}, message: hello ${id}`);
});

app.get('/api/hello', function (req, res) {
  res.send(`status:${res.statusCode}, message: hello`);
});

app.get('/api/search', function (req, res) {
  let search = req.query.s;
  if (search) {
    res
      .status(200)
      .send(`status: ${res.statusCode}, message: 'ok', data: ${search} `);
  } else {
    res
      .status(500)
      .send(
        ` status: ${res.statusCode}, error: true, message: 'you have to provide a search`
      );
  }
});

app.post('/api/addmovies', function (req, res) {
  let addTitle = req.query.title;
  let addYear = req.query.year;
  let addRating = req.query.rating || 4;
  if (!addTitle || !addYear) {
    res
      .status(403)
      .send(
        ` status: ${res.statusCode}, error: true, message: 'you have to provide a title and a year'`
      );
  } else if (addYear.length < 4 || addYear.length > 4 || isNaN(addYear)) {
    res
      .status(403)
      .send(
        ` status: ${res.statusCode}, error: true, message: 'make sure you put 4 digits'`
      );
  } else {
    movies.push({
      title: addTitle,
      year: addYear,
      rating: addRating,
      id: movies.length + 1,
    });
    res
      .status(200)
      .send(`status:${res.statusCode}. movies has been added successfully`);
  }
});

app.get('/api/movies', function (req, res) {
  const response = {
    status: res.statusCode,
    data: movies,
  };
  res.send(response);
});

app.put('/api/editmovies/:id', function (req, res) {
  let editMoviesTitle = req.query.title;
  let editMoviesYear = req.query.year;
  let editMoviesRating = req.query.rating;
  let movieId = parseInt(req.params.id);
  let movieToEdit = movies.find((movie) => movie.id === movieId);
  if (!movieToEdit) {
    res.status(404).send({
      status: 404,
      error: true,
      message: `The movie with ID ${movieId} does not exist`,
    });
  }
  if (editMoviesTitle) {
    movieToEdit.title = editMoviesTitle;
  }
  if (editMoviesYear) {
    movieToEdit.year = editMoviesYear;
  }
  if (editMoviesRating) {
    movieToEdit.rating = editMoviesRating;
  }
  res.status(200).send({
    status: 200,
    error: false,
    message: 'Movie edited successfully',
    movies: movies,
  });
});

app.delete('/api/deletemovies/:id', function (req, res) {
  const movieId = parseInt(req.params.id);
  const movieIndex = movies.findIndex((movie) => movie.id === movieId);
  if (movieIndex === -1) {
    res.status(404).send({
      status: 404,
      error: true,
      message: `The movie with ID ${movieId} does not exist`,
    });
  } else {
    movies.splice(movieIndex, 1);
    res.status(200).send({
      status: 200,
      error: false,
      message: 'Movie deleted successfully',
      movies: movies,
    });
  }
});

app.get('/api/movies/by-date', function (req, res) {
  movies.sort((a, b) => {
    return a.year - b.year;
  });
  const response = {
    statues: res.statusCode,
    data: movies,
  };
  res.status(200).send(response);
});

app.get('/api/movies/by-rating', function (req, res) {
  movies.sort((a, b) => {
    return b.rating - a.rating;
  });
  const response = {
    statues: res.statusCode,
    data: movies,
  };
  res.status(200).send(response);
});

app.get('/api/movies/by-tittle', function (req, res) {
  movies.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) return -1;
    if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
    return 0;
  });
  const response = {
    statues: res.statusCode,
    data: movies,
  };
  res.status(200).send(response);
});

app.get('/api/movies/id/:id', function (req, res) {
  let id = parseInt(req.params.id);
  let movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    res
      .statues(404)
      .send(
        `statues:${res.statusCode}, message: the movie ${id} does not exist,`
      );
  } else {
    res.send(movie);
  }
});

app.listen(8080);
