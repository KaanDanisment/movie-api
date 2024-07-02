const expres = require("express");

const movieController = require("../controllers/movieController");

const router = expres.Router();

router.route("/").post(movieController.createMovie);
router.route("/").get(movieController.getAllMovies);

module.exports = router;
