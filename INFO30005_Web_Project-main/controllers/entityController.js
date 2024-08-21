const mongoose = require("mongoose");
const moment = require("moment");
const { validationResult } = require("express-validator");
const Patient = require("../models/patientModel");
const Entity = require("../models/timeSeriesModel");

const editGlucoseDataToday = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const today = moment().startOf("day");
    const patient = await Patient.findOne({ _id: req.user._id });
    const entityID = patient.blood_glucose_record.record;
    Entity.findOne(
        {
            _id: { $in: entityID },
            when: {
                $gte: today.toDate(),
                $lte: moment(today).endOf("day").toDate(),
            },
        },
        async (err, glu) => {
            if (err) {
                return res.status(400).json({ errors: errors.array() });
            } else if (glu) {
                return res.send(
                    '<script>alert("Sorry! You already entered blood glucose data today."); window.location.href = "../entry_today"; </script>'
                );
            } else {
                const data = new Entity({
                    value: req.body.value,
                    comment: req.body.comment,
                });
                data.save();

                await Patient.updateOne(
                    { _id: req.user._id },
                    { $push: { "blood_glucose_record.record": data._id } }
                )
                    .then(
                        setTimeout(function () {
                            res.redirect("../entry_today");
                        }, 1000)
                    )
                    .catch((err) => {
                        console.error(err.message);
                        res.status(500).send(err.message);
                    });
            }
        }
    );
};

const editInsulinDataToday = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const today = moment().startOf("day");
    const patient = await Patient.findOne({ _id: req.user._id });
    const entityID = patient.dose_of_insulin_taken_record.record;
    Entity.findOne(
        {
            _id: { $in: entityID },
            when: {
                $gte: today.toDate(),
                $lte: moment(today).endOf("day").toDate(),
            },
        },
        async (err, insu) => {
            if (err) {
                return res.status(400).json({ errors: errors.array() });
            } else if (insu) {
                return res.send(
                    '<script>alert("Sorry! You already entered insulin data today."); window.location.href = "../entry_today"; </script>'
                );
            } else {
                const data = new Entity({
                    value: req.body.value,
                    comment: req.body.comment,
                });
                data.save();

                await Patient.updateOne(
                    { _id: req.user._id },
                    {
                        $push: {
                            "dose_of_insulin_taken_record.record": data._id,
                        },
                    }
                )
                    .then(
                        setTimeout(function () {
                            res.redirect("../entry_today");
                        }, 1000)
                    )
                    .catch((err) => {
                        console.error(err.message);
                        res.status(500).send(err.message);
                    });
            }
        }
    );
};

const editWeightDataToday = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const today = moment().startOf("day");
    const patient = await Patient.findOne({ _id: req.user._id });
    const entityID = patient.weight_record.record;
    Entity.findOne(
        {
            _id: { $in: entityID },
            when: {
                $gte: today.toDate(),
                $lte: moment(today).endOf("day").toDate(),
            },
        },
        async (err, weig) => {
            if (err) {
                return res.status(400).json({ errors: errors.array() });
            } else if (weig) {
                return res.send(
                    '<script>alert("Sorry! You already entered weight data today."); window.location.href = "../entry_today"; </script>'
                );
            } else {
                const data = new Entity({
                    value: req.body.value,
                    comment: req.body.comment,
                });
                data.save();

                await Patient.updateOne(
                    { _id: req.user._id },
                    { $push: { "weight_record.record": data._id } }
                )
                    .then(
                        setTimeout(function () {
                            res.redirect("../entry_today");
                        }, 1000)
                    )
                    .catch((err) => {
                        console.error(err.message);
                        res.status(500).send(err.message);
                    });
            }
        }
    );
};

const editExerciseDataToday = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const today = moment().startOf("day");
    const patient = await Patient.findOne({ _id: req.user._id });
    const entityID = patient.exercise_record.record;
    Entity.findOne(
        {
            _id: { $in: entityID },
            when: {
                $gte: today.toDate(),
                $lte: moment(today).endOf("day").toDate(),
            },
        },
        async (err, weig) => {
            if (err) {
                return res.status(400).json({ errors: errors.array() });
            } else if (weig) {
                return res.send(
                    '<script>alert("Sorry! You already entered exercise data today."); window.location.href = "../entry_today"; </script>'
                );
            } else {
                const data = new Entity({
                    value: req.body.value,
                    comment: req.body.comment,
                });
                data.save();

                await Patient.updateOne(
                    { _id: req.user._id },
                    { $push: { "exercise_record.record": data._id } }
                )
                    .then(
                        setTimeout(function () {
                            res.redirect("../entry_today");
                        }, 1000)
                    )
                    .catch((err) => {
                        console.error(err.message);
                        res.status(500).send(err.message);
                    });
            }
        }
    );
};

module.exports = {
    editGlucoseDataToday,
    editInsulinDataToday,
    editWeightDataToday,
    editExerciseDataToday,
};
