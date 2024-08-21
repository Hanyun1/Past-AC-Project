const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const Patient = require("../models/patientModel");
const Clinician = require("../models/clinicianModel");
const ClinicalNote = require("../models/clinicalNoteModel");

// handle request to get all data
const getAllPeopleData = async (req, res, next) => {
    try {
        const clinician = await Clinician.findOne(
            { _id: req.user._id },
            {}
        ).lean();
        if (clinician.patient_list != null) {
            const patientsID = clinician.patient_list;
            const allpatients = await Patient.find({ _id: { $in: patientsID } })
                .lean()
                .populate({ path: "dose_of_insulin_taken_record.record" })
                .populate({ path: "weight_record.record" })
                .populate({ path: "exercise_record.record" })
                .populate({ path: "blood_glucose_record.record" });
            return res.render("clinician/dashboard", {
                data: allpatients,
                data_cli: clinician,
                layout: "clinicianMain",
            });
        } else {
            return res.render("clinician/dashboard", {
                layout: "clinicianMain",
            });
        }
    } catch (err) {
        return next(err);
    }
};

const getCommentList = async (req, res, next) => {
    try {
        const clinician = await Clinician.findOne({ _id: req.user._id }, {});
        if (clinician.patient_list != null) {
            const patientsID = clinician.patient_list;
            const allpatients = await Patient.find({ _id: { $in: patientsID } })
                .lean()
                .populate({ path: "dose_of_insulin_taken_record.record" })
                .populate({ path: "weight_record.record" })
                .populate({ path: "exercise_record.record" })
                .populate({ path: "blood_glucose_record.record" });
            var allComments = wrapCommentList(allpatients);
            return res.render("clinician/commentList", {
                data: allComments,
                layout: "clinicianMain",
            });
        }
        return res.render("clinician/commentList", {
            layout: "clinicianMain",
        });
    } catch (err) {
        return next(err);
    }
};

const getOnePatient = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.params._id })
            .lean()
            .populate({ path: "dose_of_insulin_taken_record.record" })
            .populate({ path: "weight_record.record" })
            .populate({ path: "exercise_record.record" })
            .populate({ path: "blood_glucose_record.record" })
            .populate({ path: "clinical_notes" });
        return res.render("clinician/viewPatient", {
            data: patient,
            layout: "clinicianMain",
        });
    } catch (err) {
        return next(err);
    }
};

const getManagePage = async (req, res, next) => {
    try {
        const patient = await Patient.findOne(
            { _id: req.params._id },
            {}
        ).lean();
        if (patient != null) {
            return res.render("clinician/managePatient", {
                data: patient,
                layout: "clinicianMain",
            });
        }
    } catch (err) {
        return next(err);
    }
};

const managePatient = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params._id;
    var check1 = false;
    var check2 = false;
    var check3 = false;
    var check4 = false;
    if (req.body.glucose_is_required) {
        check1 = true;
    }
    if (req.body.insulin_is_required) {
        check2 = true;
    }
    if (req.body.weight_is_required) {
        check3 = true;
    }
    if (req.body.exercise_is_required) {
        check4 = true;
    }
    await Patient.findOneAndUpdate(
        { _id: id },
        {
            "blood_glucose_record.is_required": check1,
            "blood_glucose_record.safe_threshold_min": req.body.glucose_min,
            "blood_glucose_record.safe_threshold_max": req.body.glucose_max,
            "dose_of_insulin_taken_record.is_required": check2,
            "dose_of_insulin_taken_record.safe_threshold_min":
                req.body.insulin_min,
            "dose_of_insulin_taken_record.safe_threshold_max":
                req.body.insulin_max,
            "weight_record.is_required": check3,
            "weight_record.safe_threshold_min": req.body.weight_min,
            "weight_record.safe_threshold_max": req.body.weight_max,
            "exercise_record.is_required": check4,
            "exercise_record.safe_threshold_min": req.body.exercise_min,
            "exercise_record.safe_threshold_max": req.body.exercise_max,
        }
    )
        .then(
            setTimeout(function () {
                res.redirect("../" + id);
            }, 1000)
        )
        .catch((err) => {
            res.json(err.message);
        });
};

const getClinicalNote = async (req, res, next) => {
    try {
        const patient = await Patient.findOne(
            { _id: req.params._id },
            {}
        ).lean();
        if (patient != null) {
            return res.render("clinician/addNotes", {
                data: patient,
                layout: "clinicianMain",
            });
        }
    } catch (err) {
        return next(err);
    }
};

const getSupportMsg = async (req, res, next) => {
    try {
        const patient = await Patient.findOne(
            { _id: req.params._id },
            {}
        ).lean();
        if (patient != null) {
            return res.render("clinician/supportMessage", {
                data: patient,
                layout: "clinicianMain",
            });
        }
    } catch (err) {
        return next(err);
    }
};

const getGlucoseHistory = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.params._id })
            .lean()
            .populate({ path: "blood_glucose_record.record" });
        return res.render("clinician/viewGlucose", {
            data: patient,
            layout: "clinicianMain",
        });
    } catch (err) {
        return next(err);
    }
};

const getWeightHistory = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.params._id })
            .lean()
            .populate({ path: "weight_record.record" });
        return res.render("clinician/viewWeight", {
            data: patient,
            layout: "clinicianMain",
        });
    } catch (err) {
        return next(err);
    }
};

const getInsulinHistory = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.params._id })
            .lean()
            .populate({ path: "dose_of_insulin_taken_record.record" });
        return res.render("clinician/viewInsulin", {
            data: patient,
            layout: "clinicianMain",
        });
    } catch (err) {
        return next(err);
    }
};

const getExerciseHistory = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.params._id })
            .lean()
            .populate({ path: "exercise_record.record" });
        return res.render("clinician/viewExercise", {
            data: patient,
            layout: "clinicianMain",
        });
    } catch (err) {
        return next(err);
    }
};

const postClinicalNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const pid = req.params._id;
    const patient = await Patient.findOne({ _id: req.params._id });
    const NoteID = patient.clinical_notes;
    ClinicalNote.findOne({ _id: { $in: NoteID } }, async (err) => {
        if (err) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            const data = new ClinicalNote({
                note: req.body.note,
            });
            data.save();

            await Patient.updateOne(
                { _id: req.params._id },
                { $push: { clinical_notes: data._id } }
            )
                .then(
                    setTimeout(function () {
                        res.redirect("../" + pid);
                    }, 1000)
                )
                .catch((err) => {
                    console.error(err.message);
                    res.status(500).send(err.message);
                });
        }
    });
};

const editSupportMsg = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const pid = req.params._id;
    await Patient.findOneAndUpdate(
        { _id: req.params._id },
        { support_message: req.body.support_message }
    )
        .then(
            setTimeout(function () {
                res.redirect("../" + pid);
            }, 1000)
        )
        .catch((err) => {
            res.json(err.message);
        });
};

class commentEntry {
    constructor(id, name, date, type, comment) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.type = type;
        this.comment = comment;
    }
}

function wrapCommentList(patients) {
    var commentList = [];

    patients.forEach((patient) => {
        patient.blood_glucose_record.record.forEach((record) => {
            if (record.comment) {
                commentList.push(
                    new commentEntry(
                        patient._id,
                        patient.screen_name,
                        record.when,
                        "blood glucose",
                        record.comment
                    )
                );
            }
        });

        patient.weight_record.record.forEach((record) => {
            if (record.comment) {
                commentList.push(
                    new commentEntry(
                        patient._id,
                        patient.screen_name,
                        record.when,
                        "weight",
                        record.comment
                    )
                );
            }
        });

        patient.dose_of_insulin_taken_record.record.forEach((record) => {
            if (record.comment) {
                commentList.push(
                    new commentEntry(
                        patient._id,
                        patient.screen_name,
                        record.when,
                        "insulin taken",
                        record.comment
                    )
                );
            }
        });

        patient.exercise_record.record.forEach((record) => {
            if (record.comment) {
                let entry = new commentEntry(
                    patient._id,
                    patient.screen_name,
                    record.when,
                    "exercise",
                    record.comment
                );
                commentList.push(entry);
            }
        });
    });

    commentList.sort((a, b) => b.date - a.date);
    return commentList;
}

module.exports = {
    getAllPeopleData,
    getOnePatient,
    managePatient,
    getManagePage,
    getClinicalNote,
    getSupportMsg,
    getGlucoseHistory,
    getWeightHistory,
    getInsulinHistory,
    getExerciseHistory,
    getCommentList,
    postClinicalNote,
    editSupportMsg,
};
