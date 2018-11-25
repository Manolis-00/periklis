var express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    expressSanitizer = require("express-sanitizer"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

//APP CONFIGURATION
mongoose.connect("mongodb://localhost/periklis", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//MONGOOSE MODEL CONFIGURATION
var countySchema = new mongoose.Schema({
    title: String,
    image: String,
    demos: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var County = mongoose.model("County", countySchema);

//RESTFUL ROUTES

//WELCOME ROUTE
app.get("/",function(req, res){
    res.render("welcome");
});

//ACCOUNT ROUTE
app.get("/log", function(req, res){
    res.render("account");
});

//SIGN UP ROUTE
app.get("/signup", function(req, res){
    res.render("login")
});

// PROBLEMS ROUTE
app.get("/problems", function(req, res){
    County.find({}, function(err, counties){
        if(err) {
            console.log(err);
        } else {
            res.render("problems", {counties: counties});
        }
    });
});

// NEW PROBLEMS ROUTE
app.get("/problems/new", function(req, res){
    res.render("new");
});

// POSTING THE PROBLEM ROUTE
app.post("/problems", function(req, res){
    //create problem
    req.body.county.body = req.sanitize(req.body.county.body)
    County.create(req.body.county, function(err, newProblem){
        if(err) {
            res.render("new");
        } else {
            // redirect
            res.redirect("/problems");
        }
    });
});

// SHOW ROUTE
app.get("/problems/:id", function(req, res) {
    County.findById(req.params.id, function(err, foundProblem) {
        if(err) {
            res.redirect("/problems");
        } else {
            res.render("show", {county: foundProblem});
        }
    });
});


app.listen(3000, function(){
    console.log("Server has started!!!")
});