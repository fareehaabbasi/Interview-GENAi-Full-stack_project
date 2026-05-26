const express = require('express');
// required all the routes here
const authRoutes = require("./routes/auth.routes")

const app = express();

app.use(express.json());
// using all the routes here
app.use("/api/auth", authRoutes)

module.exports = app;