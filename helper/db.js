const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://localhost/movie-api");
  mongoose.connection.on("open", () => {
    console.log("Connected DB");
  });
  mongoose.connection.on("err", (err) => {
    console.log("MongoDB: Error", err);
  });
};
