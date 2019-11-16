const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const routes = require("./routes/api/v1/routes");

const app = express();

app.get("/", (req, res) => res.send("Hello World!"));
// body parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport.js")(passport);

// handle cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

// // Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to db"))
  .catch(err => console.log(err));

// all user routes

app.use("/api/v1/", routes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running in port ${port}`));
