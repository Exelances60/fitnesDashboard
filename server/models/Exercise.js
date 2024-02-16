const moongose = require("mongoose");

const Schema = moongose.Schema;

const exerciseSchema = new Schema({
  bodyPart: {
    type: String,
    require: true,
  },
  equipment: {
    type: String,
    require: true,
  },
  gifUrl: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  secondaryMuscle: {
    type: Array.of(String),
    require: true,
  },
  instructions: {
    type: Array.of(String),
    require: true,
  },
});

module.exports = moongose.model("Exercise", exerciseSchema);
