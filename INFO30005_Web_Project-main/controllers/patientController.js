const mongoose = require("mongoose");
const Patient = require("../models/patientModel");
const { validationResult } = require("express-validator");
const Clinician = require("../models/clinicianModel");
const { path } = require("express/lib/application");
const { parse } = require("handlebars");

const getPatientEntryToday = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.user._id })
            .lean()
            .populate({ path: "dose_of_insulin_taken_record.record" })
            .populate({ path: "weight_record.record" })
            .populate({ path: "exercise_record.record" })
            .populate({ path: "blood_glucose_record.record" });
        return res.render("patient/entry_today", {
            data: patient,
            layout: "patientMain",
        });
    } catch (err) {
        return next(err);
    }
};

const getPatientDashboard = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.user._id }).lean();
        return res.render("patient/dashboard.hbs", {
            layout: "patientMain",
            data: patient,
        });
    } catch (err) {
        return next(err);
    }
};

const getPatientEngagement = async (req, res, next) => {
    var array = [];
    const patient = await Patient.findOne({ _id: req.user._id });
    const date = patient.account_start_date;
    array.push(patient.weight_record);
    array.push(patient.exercise_record);
    array.push(patient.blood_glucose_record);
    array.push(patient.dose_of_insulin_taken_record);
    const rate = calEngage(date, array);
    return res.render("patient/badge", {
        e_rate: rate,
        layout: "patientMain",
    });
};

const getPatientLeaderboard = async (req, res) => {
    const patients = await Patient.find({});
    const leaderboard = top5(patients);
    return res.render("patient/leaderboard", {
        data: leaderboard,
        layout: "patientMain",
    });
};

function calEngage(date, records) {
    const today = new Date().getTime();
    var total_day = Math.round((today - date) / (1000 * 60 * 60 * 24));
    var ed_entries = 0;

    if (!total_day) {
        total_day = 1;
    }

    records.forEach((e) => {
        var tmp = e.record.length;
        if (tmp > ed_entries) {
            ed_entries = tmp;
        }
    });
    var rate = parseInt((ed_entries / total_day) * 100);
    if (rate >= 100) {
        rate = 100;
    }
    return rate;
}

function top5(patients) {
    var arr = [];
    patients.forEach((e) => {
        var tmp = [
            e.weight_record,
            e.exercise_record,
            e.blood_glucose_record,
            e.dose_of_insulin_taken_record,
        ];
        var rate = parseInt(calEngage(e.account_start_date, tmp));
        arr.push({ name: e.screen_name, rate: rate });
    });
    arr.sort((a, b) => {
        return b.rate - a.rate;
    });
    if (arr.length > 5) {
        return arr.slice(0, 5);
    } else {
        return arr;
    }
}

const getPatientStatics = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.user._id })
            .lean()
            .populate({ path: "dose_of_insulin_taken_record.record" })
            .populate({ path: "weight_record.record" })
            .populate({ path: "exercise_record.record" })
            .populate({ path: "blood_glucose_record.record" });
        var recordList =  wrapRecord(patient);
        return res.render("patient/viewRecord", {
            data: recordList,
            layout: "patientMain",
        });
    } catch (err) {
        return next(err);
    }
};
const getPatientGlucose = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.user._id })
            .lean()
            .populate({ path: "blood_glucose_record.record" });
        return res.render("patient/glucoserecord", {
            data: patient,
            layout: "patientMain",
        });
    } catch (err) {
        return next(err);
    }
};

const getPatientExercise = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.user._id })
            .lean()
            .populate({ path: "exercise_record.record" });
        return res.render("patient/exerciserecord", {
            data: patient,
            layout: "patientMain",
        });
    } catch (err) {
        return next(err);
    }
};

const getPatientWeight = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.user._id })
            .lean()
            .populate({ path: "weight_record.record" });
        return res.render("patient/weightrecord", {
            data: patient,
            layout: "patientMain",
        });
    } catch (err) {
        return next(err);
    }
};

const getPatientInsulin = async (req, res, next) => {
    try {
        const patient = await Patient.findOne({ _id: req.user._id })
            .lean()
            .populate({ path: "dose_of_insulin_taken_record.record" });
        return res.render("patient/insulinrecord", {
            data: patient,
            layout: "patientMain",
        });
    } catch (err) {
        return next(err);
    }
};

class recordEntry {
    constructor(date, value, type, comment) {
        this.date = date;
        this.value = value;
        this.type = type;
        this.comment = comment;
    }
}

function wrapRecord(patient) {
    var recordList = [];

        patient.blood_glucose_record.record.forEach((record) => {
            recordList.push(
                    new recordEntry(
                        record.when,
                        record.value,
                        "glucose",
                        record.comment
                    )
                );
        });

        patient.weight_record.record.forEach((record) => {
            recordList.push(
                    new recordEntry(
                        record.when,
                        record.value,
                        "weight",
                        record.comment
                    )
                );
        });

        patient.dose_of_insulin_taken_record.record.forEach((record) => {
            recordList.push(
                    new recordEntry(
                        record.when,
                        record.value,
                        "insulin",
                        record.comment
                    )
                );
        });

        patient.exercise_record.record.forEach((record) => {
                let entry = new recordEntry(
                    record.when,
                    record.value,
                    "exercise",
                    record.comment
                );
                recordList.push(entry);
        });

    recordList.sort((a, b) => b.date - a.date);
    return recordList;
};

module.exports = {
    getPatientEntryToday,
    getPatientDashboard,
    getPatientEngagement,
    getPatientLeaderboard,
    getPatientExercise,
    getPatientGlucose,
    getPatientInsulin,
    getPatientWeight,
    getPatientStatics,
};
