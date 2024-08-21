const express = require("express");
const { check } = require("express-validator");
const clinicianRouter = express.Router();
const clinicianController = require("../controllers/clinicianController");
const authController = require("../controllers/authController");

// add a route to handle the GET request for all patients
clinicianRouter.get(
    "/",
    authController.isAuthenticatedClinician,
    clinicianController.getAllPeopleData
);

clinicianRouter.get(
    "/patient/:_id",
    authController.isAuthenticatedClinician,
    clinicianController.getOnePatient
);

clinicianRouter.get(
    "/patient/history/glucose/:_id",
    authController.isAuthenticatedClinician,
    clinicianController.getGlucoseHistory
);

clinicianRouter.get(
    "/patient/history/weight/:_id",
    authController.isAuthenticatedClinician,
    clinicianController.getWeightHistory
);

clinicianRouter.get(
    "/patient/history/insulin/:_id",
    authController.isAuthenticatedClinician,
    clinicianController.getInsulinHistory
);

clinicianRouter.get(
    "/patient/history/exercise/:_id",
    authController.isAuthenticatedClinician,
    clinicianController.getExerciseHistory
);

clinicianRouter.get(
    "/commentlist",
    authController.isAuthenticatedClinician,
    clinicianController.getCommentList
);

clinicianRouter.get(
    "/patient/manage/:_id",
    authController.isAuthenticatedClinician,
    clinicianController.getManagePage
);

clinicianRouter.get(
    "/patient/note/:_id",
    authController.isAuthenticatedClinician,
    clinicianController.getClinicalNote
);

clinicianRouter.get(
    "/patient/message/:_id",
    authController.isAuthenticatedClinician,
    clinicianController.getSupportMsg
);

clinicianRouter.post(
    "/patient/note/:_id",
    [
        authController.isAuthenticatedClinician,
        [
            [
                check(
                    "note",
                    "note suppose to have maximum length 100"
                ).isLength({
                    max: 100,
                }),
            ],
        ],
    ],
    clinicianController.postClinicalNote
);

clinicianRouter.post(
    "/patient/message/:_id",
    [
        authController.isAuthenticatedClinician,
        [
            [
                check(
                    "support_message",
                    "support_message suppose to have maximum length 100"
                ).isLength({
                    max: 100,
                }),
            ],
        ],
    ],
    clinicianController.editSupportMsg
);

clinicianRouter.post(
    "/patient/manage/:_id",
    [
        authController.isAuthenticatedClinician,
        [
            [
                check(
                    "glucose_min",
                    "glucose_min suppose to in range 0-100000"
                ).isFloat({ min: 0, max: 100000 }),
                check(
                    "glucose_max",
                    "glucose_max suppose to in range 0-100000"
                ).isFloat({ min: 0, max: 100000 }),
                check(
                    "weight_min",
                    "weight_min suppose to in range 0-100000"
                ).isFloat({ min: 0, max: 100000 }),
                check(
                    "weight_max",
                    "weight_max suppose to in range 0-100000"
                ).isFloat({ min: 0, max: 100000 }),
                check(
                    "insulin_min",
                    "insulin_min suppose to in range 0-100000 and suppose to be an integer"
                ).isInt({ min: 0, max: 100000 }),
                check(
                    "insulin_max",
                    "insulin_max suppose to in range 0-100000 and suppose to be an integer"
                ).isInt({ min: 0, max: 100000 }),
                check(
                    "exercise_min",
                    "exercise_min suppose to in range 0-100000 and suppose to be an integer"
                ).isInt({ min: 0, max: 100000 }),
                check(
                    "exercise_max",
                    "exercise_max suppose to in range 0-100000 and suppose to be an integer"
                ).isInt({ min: 0, max: 100000 }),
            ],
        ],
    ],
    clinicianController.managePatient
);

// export the router
module.exports = clinicianRouter;
