//dependencies

const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const dotenv = require("dotenv");

// initialize express app
const app = express();

// config settings
dotenv.config();
const port = process.env.PORT ? process.env.PORT : "3000" ;
// const port = process.env.PORT || "3000" ;  using OR operator

//connection to mongoDB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

//mount middleware
app.use(express.urlencoded({ extended: false }));  // parsing data from url
app.use(methodOverride("_method"));  // for using HTTP PUT or DELETE
app.use(morgan("dev"));  //morgan for logging HTTP requests

//mount routes

// landing page 
app.get("/", (req, res) => {
    res.render("index.ejs");
});


// tell the app to listen for HTTP requests
app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
  });





