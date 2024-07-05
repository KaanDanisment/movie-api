const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.json({
        status: false,
        message: "There is no user in this username",
      });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (!result) {
          res.json({
            status: false,
            message: "Wrong Password",
          });
        } else {
          const payload = {
            username,
          };
          const token = jwt.sign(payload, req.app.get("api_secret_key"), {
            expiresIn: 720, // 12 saat
          });
          res.json({
            status: true,
            token,
          });
        }
      });
    }
  } catch (err) {}
}

module.exports = {
  createUser,
  loginUser,
};
