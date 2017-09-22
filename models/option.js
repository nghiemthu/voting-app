var mongoose = require("mongoose");

var optionSchema = new mongoose.Schema({
    description: String,
    vote: { type: Number, default: 0}
});

module.exports = mongoose.model("option", optionSchema);