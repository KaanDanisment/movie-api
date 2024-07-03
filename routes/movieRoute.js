const expres = require("express");

const movieController = require("../controllers/movieController");

const router = expres.Router();

router.route("/").post(movieController.createMovie);
router.route("/").get(movieController.getAllMovies);
router.route("/top10").get(movieController.top10Movies);
router.route("/:id").get(movieController.getMovie);
router.route("/:id").put(movieController.updateMovie);
router.route("/:id").delete(movieController.deleteMovie);
router.route("/:start_year/:end_year").get(movieController.between2Years);

module.exports = router;
