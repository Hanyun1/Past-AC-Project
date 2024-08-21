// set up Passport

const req = require("express/lib/request");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Patient = require("./models/patientModel");
const Clinician = require("./models/clinicianModel");

passport.serializeUser((user, done) => {
    done(undefined, user);
});

passport.deserializeUser((_id, done) => {
    Clinician.findById(_id, { password: 0 }, (err, user) => {
        if (err) {
            return done(err, undefined);
        }
        if (!user) {
            done("pass");
        } else {
            return done(undefined, user);
        }
    });
});
passport.deserializeUser((_id, done) => {
    Patient.findById(_id, { password: 0 }, (err, user) => {
        if (err) {
            return done(err, undefined);
        }
        return done(undefined, user);
    });
});

// Set up "local" strategy, i.e. authentication based on username/password. There are other types of strategy too.

var patientStrategy = new LocalStrategy((username, password, cb) => {
    // first, check if there is a user in the db with this username
    Patient.findOne({ email: username }, {}, {}, (err, user) => {
        if (err) {
            return cb(null, false, { message: "Unknown error." });
        }
        if (!user) {
            return cb(null, false, { message: "Incorrect username." });
        }
        // if there is a user with this username, check if the password matches
        user.verifyPassword(password, (err, valid) => {
            if (err) {
                return cb(null, false, { message: "Unknown error." });
            }
            if (!valid) {
                return cb(null, false, { message: "Incorrect password." });
            }
            return cb(null, user);
        });
    });
});

var clinicianStrategy = new LocalStrategy((username, password, cb) => {
    // first, check if there is a user in the db with this username
    Clinician.findOne({ email: username }, {}, {}, (err, user) => {
        if (err) {
            return cb(null, false, { message: "Unknown error." });
        }
        if (!user) {
            return cb(null, false, { message: "Incorrect username." });
        }
        // if there is a user with this username, check if the password matches
        user.verifyPassword(password, (err, valid) => {
            if (err) {
                return cb(null, false, { message: "Unknown error." });
            }
            if (!valid) {
                return cb(null, false, { message: "Incorrect password." });
            }
            return cb(null, user);
        });
    });
});

passport.use("patient", patientStrategy);
passport.use("clinician", clinicianStrategy);

module.exports = passport;
