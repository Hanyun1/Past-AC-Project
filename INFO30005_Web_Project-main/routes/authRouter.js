const express = require("express");
const passport = require("../passport.js");
const { check } = require("express-validator");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.post("/patientsignup", authController.signupPatient);

authRouter.post(
    "/home/clinician_dashboard/register_patient",
    [
        authController.isAuthenticatedClinician,
        [
            [
                check("email", "User name shoud have email type").isEmail(),
                check(
                    "password",
                    "Password shoud have minimum length 8"
                ).isLength({
                    min: 8,
                }),
                check("given_name", "Given name shoud not be blank")
                    .not()
                    .isEmpty(),
                check("family_name", "Family name shoud not be blank")
                    .not()
                    .isEmpty(),
                check("screen_name", "Screen name shoud not be blank")
                    .not()
                    .isEmpty(),
                check(
                    "year_of_birth",
                    "Year of birth suppose to be in range 1000-9999"
                ).isInt({ min: 1000, max: 9999 }),
                check(
                    "text_bio",
                    "Text bio shoud have maximum length of 100"
                ).isLength({
                    max: 100,
                }),
                check(
                    "bgr_min",
                    "glucose_min suppose to be in range 0-100000"
                ).isFloat({ min: 0, max: 100000 }),
                check(
                    "bgr_max",
                    "glucose_max suppose to be in range 0-100000"
                ).isFloat({ min: 0, max: 100000 }),
                check(
                    "wr_min",
                    "weight_min suppose to be in range 0-100000"
                ).isFloat({ min: 0, max: 100000 }),
                check(
                    "wr_max",
                    "weight_max suppose to be in range 0-100000"
                ).isFloat({ min: 0, max: 100000 }),
                check(
                    "doitr_min",
                    "insulin_min suppose to be in range 0-100000 and suppose to be an integer"
                ).isInt({ min: 0, max: 100000 }),
                check(
                    "doitr_max",
                    "insulin_max suppose to be in range 0-100000 and suppose to be an integer"
                ).isInt({ min: 0, max: 100000 }),
                check(
                    "er_min",
                    "exercise_min suppose to be in range 0-100000 and suppose to be an integer"
                ).isInt({ min: 0, max: 100000 }),
                check(
                    "er_max",
                    "exercise_max suppose to be in range 0-100000 and suppose to be an integer"
                ).isInt({ min: 0, max: 100000 }),
            ],
        ],
    ],
    authController.registerPatient
);

authRouter.post("/cliniciansignup", authController.signupClinician);

authRouter.post(
    "/patientLogin",
    passport.authenticate("patient", {
        failureRedirect: "/patientLogin",
        failureFlash: true,
    }),
    (req, res) => {
        console.log("user " + req.user.email + " patient"); // for debugging
        res.redirect("/home/patient_dashboard"); // login was successful, send user to home page
    }
);

authRouter.post(
    "/clinicianLogin",
    passport.authenticate("clinician", {
        failureRedirect: "/clinicianLogin",
        failureFlash: true,
    }),
    (req, res) => {
        console.log("user " + req.user.email + " clinician"); // for debugging
        res.redirect("/home/clinician_dashboard"); // login was successful, send user to home page
    }
);

authRouter.get(
    "/home/clinician_dashboard/register_patient",
    authController.isAuthenticatedClinician,
    (req, res) => {
        res.render("clinician/register_patient", {
            layout: "clinicianMain",
            title: "register_patient",
            data: null,
        });
    }
);

authRouter.get("/patientLogin", (req, res) => {
    res.render("patient/login", {
        flash: req.flash("error"),
        layout: "patientMain",
        title: "Login",
    });
});

authRouter.get("/clinicianLogin", (req, res) => {
    res.render("clinician/login", {
        flash: req.flash("error"),
        layout: "clinicianMain",
        title: "Login",
    });
});

authRouter.get(
    "/home/patient_dashboard/changePassword",
    authController.isAuthenticatedPatient,
    authController.getPassword
);

authRouter.post(
    "/home/patient_dashboard/changePassword",
    [
        authController.isAuthenticatedPatient,
        [
            [
                check(
                    "newPassword",
                    "password suppose to have minimum length 8"
                ).isLength({
                    min: 8,
                }),
            ],
        ],
    ],
    authController.editPatientPassword
);

authRouter.put(
    "/clinicianLogin/changePassword",
    authController.editClinicianPassword
);

authRouter.get("*", (req, res) => {
    res.render("home/404.hbs", { layout: "404Main" });
});

authRouter.post("/logoutClinician", (req, res) => {
    req.logout(); // kill the session
    res.redirect("/home/clinician_dashboard");
});

authRouter.post("/logoutPatient", (req, res) => {
    req.logout(); // kill the session
    res.redirect("/home/patient_dashboard");
});

module.exports = authRouter;
