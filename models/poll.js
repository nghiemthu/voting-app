var mongoose = require("mongoose");

var pollSchema = new mongoose.Schema({
  title: String,
  description: String,
  voters: { type: Array, default: []},
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  options: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "option"
    }
  ]
});

module.exports = mongoose.model('poll', pollSchema);