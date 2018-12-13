var express          = require("express"),
    methodOverride   = require("method-override"),
    app              = express(),
    expressSanitizer = require("express-sanitizer"),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose");
    County           = require("./models/county");

//require routes
var countyRoutes = require("./routes/county");

//APP CONFIGURATION
mongoose.connect("mongodb://localhost/periklis", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use("/", countyRoutes);

app.listen(3000, function(){
    console.log("Server has started!!!")
});