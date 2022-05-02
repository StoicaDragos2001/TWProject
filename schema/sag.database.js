const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SagSchema = new Schema({
  full_name: {
    type: String,
    unique: true,
    required: true,
  },
  show: { type: String, required: true },
  category: { type: String, required: true },
  year: { type: String, required: true },
  won: { type: String, required: true },
});

const SAG = mongoose.model("awards", SagSchema);
module.exports = { SAG };
