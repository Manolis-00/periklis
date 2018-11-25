var express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//APP CONFIGURATION
mongoose.connect("mongodb://localhost/periklis", { useNewUrlParser: true });
app.use(bodyParser.urlencoded{{extended: true}});
app.use(expressSanitizer());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//MONGOOSE MODEL CONFIGURATION
var countySchema = new mongoose.Schema({
    title: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var County = mongoose.model("County", countySchema);

//RESTFUL ROUTES

//WELCOME ROUTE
app.get("/",function(req, res){
    res.render("welcome");
});