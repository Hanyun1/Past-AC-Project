const express = require("express");
const cors = require("cors");
const flash = require("express-flash"); // for showing login error messages
const session = require("express-session"); // for managing user sessions
const hbs = require("./handlebarHelper.js");
const clinicianRouter = require("./routes/clinicianRouter");
const patientRouter = require("./routes/patientRouter");
const homeRouter = require("./routes/homeRouter");
const entityRouter = require("./routes/entityRouter");
const authRouter = require("./routes/authRouter");
require("./models");

// Set your app up as an express app
const app = express();
const port = process.env.PORT || 3000;

app.use(flash());
app.use(cors());
app.use(express.json()); // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: true })); // only needed for URL-encoded input
app.use(express.static("public"));
app.use("/public/js", express.static(__dirname + "/public/js"));

app.use(
    session({
        // The secret used to sign session cookies (ADD ENV VAR)
        secret: process.env.SESSION_SECRET || "keyboard cat",
        name: "demo", // The cookie name (CHANGE THIS)
        saveUninitialized: false,
        resave: false,
        proxy: process.env.NODE_ENV === "production", //  to work on Heroku
        cookie: {
            sameSite: "strict",
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            //maxAge: 300000, // sessions expire after 5 minutes
            maxAge: 300000000000,
        },
    })
);

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// middleware to log a message each time a request arrives at the server - handy for debugging
app.use((req, res, next) => {
    console.log("message arrived: " + req.method + " " + req.path);
    next();
});

const passport = require("./passport.js");
app.use(passport.authenticate("session"));

// routes

app.use("/home/clinician_dashboard", clinicianRouter);
app.use("/home", entityRouter);
app.use("/home/patient_dashboard", patientRouter);
app.use("/home", homeRouter);
app.use("/", authRouter);

// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(port, () => {
    console.log(`Server is running on port: ${port}!`);
});

module.exports = app;
