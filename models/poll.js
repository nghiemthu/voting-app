var mongoose = require("mongoose");

var pollSchema = new mongoose.Schema({
    title: String,
    description: String,
    options: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "option"
        }
    ]
});

module.exports = mongoose.model('Poll', pollSchema);