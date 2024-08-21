const express = require("express");
const { check } = require("express-validator");
const entityRouter = express.Router();
const entityController = require("../controllers/entityController");
const authController = require("../controllers/authController");

entityRouter.post(
    "/patient_dashboard/entry_today/glucose",
    [
        authController.isAuthenticatedPatient,
        [
            check(
                "value",
                "Blood glucose level should be in range 0-99999"
            ).isFloat({ min: 0, max: 99999 }),
            check(
                "comment",
                "Comment should not have length larger than 3000"
            ).isLength({ max: 3000 }),
        ],
    ],
    entityController.editGlucoseDataToday
);

entityRouter.post(
    "/patient_dashboard/entry_today/insulin",
    [
        authController.isAuthenticatedPatient,
        [
            check(
                "value",
                "Does of insulin taken should be in range 0-99999 and have type of integer"
            ).isInt({ min: 0, max: 99999 }),
            check(
                "comment",
                "Comment should not have length larger than 3000"
            ).isLength({ max: 3000 }),
        ],
    ],
    entityController.editInsulinDataToday
);

entityRouter.post(
    "/patient_dashboard/entry_today/weight",
    [
        authController.isAuthenticatedPatient,
        [
            check("value", "Weight should be in range 0-99999").isFloat({
                min: 0,
                max: 99999,
            }),
            check(
                "comment",
                "Comment should not have length larger than 3000"
            ).isLength({ max: 3000 }),
        ],
    ],
    entityController.editWeightDataToday
);

entityRouter.post(
    "/patient_dashboard/entry_today/exercise",
    [
        authController.isAuthenticatedPatient,
        [
            check("value", "Exercise should be in range 0-99999").isInt({
                min: 0,
                max: 99999,
            }),
            check(
                "comment",
                "Comment should not have length larger than 3000"
            ).isLength({ max: 3000 }),
        ],
    ],
    entityController.editExerciseDataToday
);

entityRouter.get(
    "/patient_dashboard/entry_today/glucose",
    authController.isAuthenticatedPatient,
    (req, res) => {
        res.render("patient/glucose.hbs", { layout: "patientMain" });
    }
);
entityRouter.get(
    "/patient_dashboard/entry_today/exercise",
    authController.isAuthenticatedPatient,
    (req, res) => {
        res.render("patient/exercise.hbs", { layout: "patientMain" });
    }
);
entityRouter.get(
    "/patient_dashboard/entry_today/insulin",
    authController.isAuthenticatedPatient,
    (req, res) => {
        res.render("patient/insulin.hbs", { layout: "patientMain" });
    }
);
entityRouter.get(
    "/patient_dashboard/entry_today/weight",
    authController.isAuthenticatedPatient,
    (req, res) => {
        res.render("patient/weight.hbs", { layout: "patientMain" });
    }
);

module.exports = entityRouter;
