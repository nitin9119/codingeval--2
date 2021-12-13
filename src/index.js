const express = require('express');

const app = express();

const {register, login}= require("./controller/auth.controller");
const movieController = require("./controller/movies.controller");
const theatreController = require("./controller/theatre.controller");
const ScreenController = require("./controller/screen.controller");
const ShowController = require("./controller/show.controller");

app.use(express.json());

app.post("/register", register);
app.post("/login", login);
app.use("/movies",movieController);
app.use("/theatre",theatreController);
app.use("/screen",ScreenController);
app.use("/show",ShowController);


module.exports = app;