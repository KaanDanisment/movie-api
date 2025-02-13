const cookieParser = require("cookie-parser");
const express = require("express");
const httpErrors = require("http-errors");
const logger = require("morgan");
const path = require("path");

const indexRoute = require("./routes/indexRoute");
const movieRoute = require("./routes/movieRoute.js");
const directorRoute = require("./routes/directorRoute.js");

const app = express();

// DB Connection
const db = require("./helper/db.js")();
// config
const config = require("./config");
app.set("api_secret_key", config.api_secret_key);
// Middleware
const verifyToken = require("./middleware/verify-token.js");

app.set("views", path.join(__dirname, "views"));
// view engine setup
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoute);
app.use("/api", verifyToken);
app.use("/api/movies", movieRoute);
app.use("/api/directors", directorRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

module.exports = app;
