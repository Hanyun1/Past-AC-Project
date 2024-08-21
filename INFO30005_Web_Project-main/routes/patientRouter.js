const express = require("express");
const passport = require("../passport.js");
const patientRouter = express.Router();
const patientController = require("../controllers/patientController");
const authController = require("../controllers/authController");

patientRouter.get(
    "/entry_today",
    authController.isAuthenticatedPatient,
    patientController.getPatientEntryToday
);

patientRouter.get(
    "/",
    authController.isAuthenticatedPatient,
    patientController.getPatientDashboard
);

patientRouter.get(
    "/my_badge",
    authController.isAuthenticatedPatient,
    patientController.getPatientEngagement
);

patientRouter.get(
    "/my_record",
    authController.isAuthenticatedPatient,
    patientController.getPatientStatics
);

patientRouter.get(
    "/my_glucose",
    authController.isAuthenticatedPatient,
    patientController.getPatientGlucose
);

patientRouter.get(
    "/my_exercise",
    authController.isAuthenticatedPatient,
    patientController.getPatientExercise
);

patientRouter.get(
    "/my_weight",
    authController.isAuthenticatedPatient,
    patientController.getPatientWeight
);

patientRouter.get(
    "/my_insulin",
    authController.isAuthenticatedPatient,
    patientController.getPatientInsulin
);

patientRouter.get(
    "/leaderboard",
    authController.isAuthenticatedPatient,
    patientController.getPatientLeaderboard);

module.exports = patientRouter;
