const express = require("express");

const router = express.Router();

const directorController = require("../controllers/directorController");

router.route("/").post(directorController.createDirector);
router.route("/").get(directorController.getAllDirectors);
router.route("/:id").get(directorController.getDirector);
router.route("/:id").put(directorController.updateDirector);
router.route("/:id").delete(directorController.deleteDirector);

module.exports = router;
