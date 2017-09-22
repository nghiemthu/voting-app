var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    usename: String,
    password: String
});

module.exports = mongoose.model("User", userSchema);