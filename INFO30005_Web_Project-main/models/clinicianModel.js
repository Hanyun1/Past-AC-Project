const { default: mongoose } = require("mongoose");
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
        required: true,
    },

    patient_list: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "patient",
        },
    ],
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

module.exports = mongoose.model("clinicians", schema);
