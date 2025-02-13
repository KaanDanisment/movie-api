const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: String,
  bio: String,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("directors", DirectorSchema);
