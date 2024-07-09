const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(
    "mongodb+srv://kaan:danisment.1@cluster0.e7rpltt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
  mongoose.connection.on("open", () => {
    console.log("Connected DB");
  });
  mongoose.connection.on("err", (err) => {
    console.log("MongoDB: Error", err);
  });
};
