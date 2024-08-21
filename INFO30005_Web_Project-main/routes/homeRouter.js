const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/about-diabetes", (req, res) => {
    res.render("home/about-diabetes.hbs", { layout: "homeMain" });
});

homeRouter.get("/about-this-website", (req, res) => {
    res.render("home/about-this-website.hbs", { layout: "homeMain" });
});


module.exports = homeRouter;
