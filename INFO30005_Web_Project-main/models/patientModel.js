const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        minlength: 8,
        required: true,
    },

    given_name: {
        type: String,
        required: true,
    },

    family_name: {
        type: String,
        required: true,
    },

    screen_name: {
        type: String,
        required: true,
    },

    year_of_birth: {
        type: Number,
        required: true,
    },

    text_bio: {
        type: String,
        maxlength: 100,
        required: true,
    },

    // used for engagement rate calculation.
    account_start_date: {
        type: Date,
        required: true,
        default: Date.now,
    },

    clinical_notes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "clinical_notes",
        },
    ],

    support_message: {
        type: String,
        maxlength: 100,
    },

    blood_glucose_record: {
        is_required: {
            type: Boolean,
            default: false,
        },

        safe_threshold_min: {
            type: Number,
            default: 4,
        },

        safe_threshold_max: {
            type: Number,
            default: 10,
        },

        // array of time-series object
        record: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "time_series",
            },
        ],
    },

    weight_record: {
        is_required: {
            type: Boolean,
            default: false,
        },

        safe_threshold_min: {
            type: Number,
            default: 40,
        },

        safe_threshold_max: {
            type: Number,
            default: 150,
        },
        // array of time-series object
        record: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "time_series",
            },
        ],
    },

    dose_of_insulin_taken_record: {
        is_required: {
            type: Boolean,
            //required: true,
            default: false,
        },

        safe_threshold_min: {
            type: Number,
            default: 1,
        },

        safe_threshold_max: {
            type: Number,
            default: 2,
        },
        // array of time-series object
        record: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "time_series",
            },
        ],
    },

    exercise_record: {
        is_required: {
            type: Boolean,
            default: false,
        },

        safe_threshold_min: {
            type: Number,
            default: 100,
        },

        safe_threshold_max: {
            type: Number,
            default: 30000,
        },
        // array of time-series object
        record: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "time_series",
            },
        ],
    },
});

schema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid);
    });
};

// Password salt factor
const SALT_FACTOR = 10;

// Hash password before saving
schema.pre("save", function save(next) {
    const user = this;
    // Go to next if password field has not been modified
    if (!user.isModified("password")) {
        return next();
    }

    // Automatically generate salt, and calculate hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => {
        if (err) {
            return next(err);
        }
        // Replace password with hash
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model("patients", schema);
