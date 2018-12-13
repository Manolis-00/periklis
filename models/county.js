var mongoose = require("mongoose");

//MONGOOSE MODEL CONFIGURATION
var countySchema = new mongoose.Schema({
    title: String,
    image: String,
    demos: String,
    body: String,
    created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("County", countySchema);