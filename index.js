const mongoose = require('mongoose');
var express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));

const movies = [
  { title: 'Jaws', year: 1975, rating: 8, id: 1 },
  { title: 'Avatar', year: 2009, rating: 7.8, id: 2 },
  { title: 'Brazil', year: 1985, rating: 8, id: 3 },
  { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2, id: 4 },
];
const users = [
  { username: 'John', password: '1234' },
  { username: 'Jane', password: '5678' },
];

function authenticateUser(req, res, next) {
  const { username, password } = req.headers;

  const authenticatedUser = users.find(
    (user) => user.username === username && user.password === password
  );

  if (authenticatedUser) {
    next();
  } else {
    res.status(401).json({ error: 'Authentication failed' });
  }
}

app.use('/api/movies', authenticateUser);

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: Number,
});
const Movie = mongoose.model('Movie', movieSchema);

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

app.post('/api/addmovies', async (req, res) => {
  const { title, year, rating } = req.body;
  if (!title || !year) {
    res
      .status(403)
      .send(
        ` status: ${res.statusCode}, error: true, message: 'you have to provide a title and a year'`
      );
  } else if (year.length < 4 || year.length > 4 || isNaN(year)) {
    res
      .status(403)
      .send(
        ` status: ${res.statusCode}, error: true, message: 'make sure you put 4 digits'`
      );
  }
  try {
    const newMovie = await Movie.create({ title, year, rating });
    res.status(200).json({ message: 'Movie has been added successfully' });
  } catch (err) {
    console.error('Error adding movie:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/api/editmovies/:id', async (req, res) => {
  try {
    const movieId = parseInt(req.params.id);

    const movieToEdit = await Movie.findById(movieId);

    if (!movieToEdit) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: `The movie with ID ${movieId} does not exist`,
      });
    }

    const { title, year, rating } = req.body;

    if (title) {
      movieToEdit.title = title;
    }
    if (year) {
      movieToEdit.year = year;
    }
    if (rating) {
      movieToEdit.rating = rating;
    }
    await movieToEdit.save();

    res.status(200).json({
      status: 200,
      error: false,
      message: 'Movie edited successfully',
      editedMovie: movieToEdit,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: true,
      message: 'An error occurred while editing the movie',
    });
  }
});

app.delete('/api/deletemovies/:id', async (req, res) => {
  try {
    const movieId = parseInt(req.params.id);

    const deletedMovie = await Movie.findByIdAndRemove(movieId);

    if (!deletedMovie) {
      return res.status(404).json({
        status: 404,
        error: true,
        message: `The movie with ID ${movieId} does not exist`,
      });
    }
    res.status(200).json({
      status: 200,
      error: false,
      message: 'Movie deleted successfully',
      deletedMovie: deletedMovie,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      error: true,
      message: 'An error occurred while deleting the movie',
    });
  }
});

app.get('/api/movies/by-date', function (req, res) {
  movies.sort((a, b) => {
    return a.year - b.year;
  });

  res.status(200).send({ statues: res.statusCode, data: movies });
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

  res.status(200).send({ statues: res.statusCode, data: movies });
});

app.get('/api/movies/id/:id', function (req, res) {
  let id = parseInt(req.params.id);
  let movie = movies.find((movie) => movie.id === id);
  if (!movie) {
    res
      .status(404)
      .send(
        `statues:${res.statusCode}, message: the movie ${id} does not exist,`
      );
  } else {
    res.send(movie);
  }
});

app.post('/api/users', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: 'Username and password are required' });
  }

  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(409).json({ error: 'Username already exists' });
  }

  const newUser = { username, password };
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully', user: newUser });
});

app.put('/api/users/:username', (req, res) => {
  const { username } = req.params;
  const { password } = req.body;

  const userToUpdate = users.find((user) => user.username === username);

  if (!userToUpdate) {
    return res.status(404).json({ error: 'User not found' });
  }

  userToUpdate.password = password;

  res.json({ message: 'User updated successfully', user: userToUpdate });
});

app.delete('/api/users/:username', (req, res) => {
  const { username } = req.params;

  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1)[0];

  res.json({ message: 'User deleted successfully', user: deletedUser });
});

mongoose
  .connect(
    'mongodb+srv://alisaghir543:Fuckoff109@cluster0.u0erpp6.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp'
  )
  .then(() => {
    app.listen(8080, () => {
      console.log('connection successful');
    });
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });
