const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const passport = require("passport");
const Patient = require("../models/patientModel");
const Clinician = require("../models/clinicianModel");

const getPassword = async (req, res, next) => {
    try {
        return res.render("patient/changePassword", {
            layout: "patientMain",
        });
    } catch (err) {
        return next(err);
    }
};

const editPatientPassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    Patient.findOne({ _id: req.user._id })
        .then((patient) => {
            if (patient) {
                (patient.password = req.body.newPassword), patient.save();
            }
        })
        .then(
            setTimeout(function () {
                res.redirect("/patientLogin");
            }, 1000)
        )
        .catch((error) => {
            res.json(error);
        });
};

const editClinicianPassword = async (req, res) => {
    Clinician.findOne({ email: req.body.email })
        .then((clinician) => {
            if (clinician) {
                (clinician.password = req.body.password),
                    clinician
                        .save()
                        .then(() =>
                            res.send({
                                message: "password changed successfully",
                            })
                        )
                        .catch((error) => {
                            res.json(error);
                        });
            } else if (!clinician) {
                res.send({ message: "no such username" });
            }
        })
        .catch((error) => {
            res.json(error);
        });
};

const signupPatient = async (req, res) => {
    var date = new Date();
    try {
        let patient = await Patient.findOne({ email: req.body.email });
        if (patient) {
            return res.status(400).json({ message: "Patient already exists" });
        }

        patient = new Patient({
            email: req.body.email,
            password: req.body.password,
            given_name: req.body.given_name,
            family_name: req.body.family_name,
            screen_name: req.body.screen_name,
            year_of_birth: req.body.year_of_birth,
            account_start_date: date,
            text_bio: req.body.text_bio,
            support_message: req.body.support_message,
            "blood_glucose_record.is_required": req.body.blood_glucose_record,
            "weight_record.is_required": req.body.weight_record,
            "dose_of_insulin_taken_record.is_required":
                req.body.dose_of_insulin_taken_record,
            "exercise_record.is_required": req.body.exercise_record,
        });

        patient.save();
        res.send({ message: "patient signup successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const signupClinician = async (req, res) => {
    try {
        let clinician = await Clinician.findOne({ email: req.body.email });
        if (clinician) {
            return res
                .status(400)
                .json({ message: "Clinician already exists" });
        }

        clinician = new Clinician({
            email: req.body.email,
            password: req.body.password,
            given_name: req.body.given_name,
            family_name: req.body.family_name,
            screen_name: req.body.screen_name,
            year_of_birth: req.body.year_of_birth,
            text_bio: req.body.text_bio,
        });

        clinician.save();
        res.send({ message: "clinician signup successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

const registerPatient = async (req, res) => {
    var date = new Date();
    const {
        email,
        password,
        given_name,
        family_name,
        screen_name,
        year_of_birth,
        text_bio,
        bgr,
        bgr_min,
        bgr_max,
        wr,
        wr_min,
        wr_max,
        doitr,
        doitr_min,
        doitr_max,
        er,
        er_min,
        er_max,
    } = req.body;

    try {
        let patient = await Patient.findOne({ email: req.body.email });
        if (patient) {
            return res.status(422).render("clinician/register_patient", {
                layout: "clinicianMain",
                title: "register_patient",
                data: {
                    email,
                    password,
                    given_name,
                    family_name,
                    screen_name,
                    year_of_birth,
                    text_bio,
                    bgr,
                    bgr_min,
                    bgr_max,
                    wr,
                    wr_min,
                    wr_max,
                    doitr,
                    doitr_min,
                    doitr_max,
                    er,
                    er_min,
                    er_max,
                    message: "Patient already exists",
                },
            });
            send({ message: "Patient already exists" });
        }

        patient = new Patient({
            email: email,
            password: password,
            given_name: given_name,
            family_name: family_name,
            screen_name: screen_name,
            year_of_birth: year_of_birth,
            text_bio: text_bio,
            account_start_date: date,

            "blood_glucose_record.is_required": bgr,
            "blood_glucose_record.safe_threshold_min": bgr_min,
            "blood_glucose_record.safe_threshold_max": bgr_max,

            "weight_record.is_required": wr,
            "weight_record.safe_threshold_min": wr_min,
            "weight_record.safe_threshold_max": wr_max,

            "dose_of_insulin_taken_record.is_required": doitr,
            "dose_of_insulin_taken_record.safe_threshold_min": doitr_min,
            "dose_of_insulin_taken_record.safe_threshold_max": doitr_max,

            "exercise_record.is_required": er,
            "exercise_record.safe_threshold_min": er_min,
            "exercise_record.safe_threshold_max": er_max,
        });

        patient.save();
        await Clinician.updateOne(
            { _id: req.user._id },
            { $push: { patient_list: patient._id } }
        ).catch((err) => {
            console.error(err.message);
            res.status(500).send("Server Error");
        });

        res.redirect("../clinician_dashboard");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// Passport Authentication middleware
const isAuthenticatedPatient = (req, res, next) => {
    // If user is not authenticated via Passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect("/patientLogin");
    }
    Clinician.findOne({ _id: req.user._id }, (err, cli) => {
        if (err) throw err;
        if (cli) {
            return res.redirect("/patientLogin");
        } else {
            return next();
        }
    });
    // Otherwise, proceed to next middleware function
    // return next();
};

const isAuthenticatedClinician = (req, res, next) => {
    // If user is not authenticated via Passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect("/clinicianLogin");
    }
    Patient.findOne({ _id: req.user._id }, (err, pati) => {
        if (err) throw err;
        if (pati) {
            return res.redirect("/clinicianLogin");
        } else {
            return next();
        }
    });
    // Otherwise, proceed to next middleware function
    // return next();
};

module.exports = {
    signupPatient,
    registerPatient,
    // signInPatient,
    signupClinician,
    isAuthenticatedPatient,
    isAuthenticatedClinician,
    getPassword,
    editPatientPassword,
    editClinicianPassword,
};
