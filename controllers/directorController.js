const mongoose = require("mongoose");
const Director = require("../models/Director");
const Movie = require("../models/Movie");

async function createDirector(req, res) {
  try {
    const director = await Director.create({ ...req.body });
    res.json(director);
  } catch (err) {
    res.json(err);
  }
}
async function getAllDirectors(req, res) {
  try {
    const directors = await Director.aggregate([
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "director_id",
          as: "movies",
        },
      },
      {
        $unwind: {
          path: "$movies",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            _id: "$_id",
            name: "$name",
            surname: "$surname",
            bio: "$bio",
          },
          movies: {
            $push: "$movies",
          },
        },
      },
      {
        $project: {
          _id: "$_id._id",
          name: "$_id.name",
          surname: "$_id.surname",
          movies: "$movies",
        },
      },
    ]);
    res.json(directors);
  } catch (err) {
    res.json(err);
  }
}

async function getDirector(req, res) {
  try {
    const director = await Director.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "movies",
          localField: "_id",
          foreignField: "director_id",
          as: "movies",
        },
      },
    ]);
    res.json(director);
  } catch (err) {
    res.json(err);
  }
}

async function updateDirector(req, res, next) {
  try {
    const director = await Director.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!director) {
      next({ message: "There is no director in this ID" });
    } else {
      res.json(director);
    }
  } catch (err) {
    res.json(err);
  }
}

async function deleteDirector(req, res) {
  try {
    await Movie.deleteMany({ director_id: req.params.id });
    const director = await Director.findByIdAndDelete(req.params.id);
    res.json(director);
  } catch (err) {
    res.json(err);
  }
}
module.exports = {
  createDirector,
  getAllDirectors,
  getDirector,
  updateDirector,
  deleteDirector,
};
