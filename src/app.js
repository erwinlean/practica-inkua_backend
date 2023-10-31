"use strict";

// Server default port is 3000 //

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// Database
const db = require("./config");

// Router
const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter");
const eventsRouter = require("./routes/eventsRouter");
const emailRouter = require("./routes/emailRouter");

const app = express(); 
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
    
// End points
app.use("/", indexRouter); 
app.use("/api/", indexRouter); 
app.use("/api/users", usersRouter); 
app.use("/api/events", eventsRouter); 
app.use("/api/email", emailRouter);

// Static files
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(function(req, res, next) {
  next(createError(404));
}); 

app.use(function(err, req, res, next) { 
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; 
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;