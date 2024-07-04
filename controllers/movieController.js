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
    const movies = await Movie.aggregate([
      {
        $lookup: {
          from: "directors",
          localField: "director_id",
          foreignField: "_id",
          as: "director",
        },
      },
    ]);
    res.json(movies);
  } catch (err) {
    res.json(err);
  }
}

async function getMovie(req, res, next) {
  try {
    const movie = await Movie.findById({ _id: req.params.id });
    if (!movie) {
      next({ message: "There is no movie in this ID" });
    } else {
      res.json(movie);
    }
  } catch (err) {
    res.json(err);
  }
}

async function updateMovie(req, res) {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      next({ message: "There is no movie in this ID" });
    } else {
      res.json(movie);
    }
  } catch (err) {
    res.json(err);
  }
}

async function deleteMovie(req, res, next) {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      next({ message: "There is no movie in this ID" });
    } else {
      res.json(movie);
    }
  } catch (err) {
    res.json(err);
  }
}
async function top10Movies(req, res) {
  try {
    const movies = await Movie.find({}).limit(10).sort({ imdb_score: -1 });
    res.json(movies);
  } catch (err) {
    res.json(err);
  }
}

async function between2Years(req, res) {
  try {
    const movies = await Movie.find({
      year: { $gte: req.params.start_year, $lte: req.params.end_year },
    });
    res.json(movies);
  } catch (err) {
    res.json(err);
  }
}
module.exports = {
  createMovie,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
  top10Movies,
  between2Years,
};
