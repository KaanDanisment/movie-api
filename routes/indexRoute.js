const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();

/* GET index page. */
router.get("/", (req, res) => {
  res.render("index", {
    title: "Express",
  });
});
router.route("/register").post(authController.createUser);
router.route("/login").post(authController.loginUser);

module.exports = router;
