var express    = require("express");
var router     = express.Router();
var County     = require("../models/county");

//WELCOME ROUTE
router.get("/",function(req, res){
    res.render("welcome");
});

// PROBLEMS ROUTE
router.get("/problems", function(req, res){
    County.find({}, function(err, counties){
        if(err) {
            console.log(err);
        } else {
            res.render("problems", {counties: counties});
        }
    });
});

// NEW PROBLEMS ROUTE
router.get("/problems/new", function(req, res){
    res.render("new");
});

// POSTING THE PROBLEM ROUTE
router.post("/problems", function(req, res){
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
router.get("/problems/:id", function(req, res) {
    County.findById(req.params.id, function(err, foundProblem) {
        if(err) {
            res.redirect("/problems");
        } else {
            res.render("show", {county: foundProblem});
        }
    });
});

// EDIT ROUTE
router.get("/problems/:id/edit", function(req, res) {
    County.findById(req.params.id, function(err, foundProblem) {
        if(err) {
            res.redirect("/problems");
        } else {
            res.render("edit", {county: foundProblem});
        }
    });
});

// UPDATE ROUTE
router.put("/problems/:id", function(req, res) {
    req.body.county.body = req.sanitize(req.body.county.body)
    County.findByIdAndUpdate(req.params.id, req.body.county, function(err, updatedProblem){
        if(err) {
            res.redirect("/problems");
        } else {
            res.redirect("/problems/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/problems/:id", function(req, res){
    //destroy problem
    County.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/problems");
        } else {
            res.redirect("/problems");
        }
    });
});

module.exports = router;
