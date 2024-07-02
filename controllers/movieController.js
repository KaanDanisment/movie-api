const Movie = require("../models/Movie");

async function createMovie(req, res) {
  try {
    const movie = await Movie.create({ ...req.body });
    res.json(movie);
  } catch (err) {
    res.json(err);
  }
}

async function getAllMovies(req, res) {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (err) {
    res.json(err);
  }
}
module.exports = {
  createMovie,
  getAllMovies,
};
