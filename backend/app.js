const express = require('express');
const app = express();
const errorMiddleware = require('../backend/middleware/error')
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path")
const cors=require('cors');

//config// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with the URL of your front-end application
    credentials: true, // Enable cookies and other credentials in cross-origin requests
  })
);
//Route imports

const user = require('./routes/userRoute');

app.use('/api/v1',user);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// middlewarre for errors
app.use(errorMiddleware);

module.exports = app;
