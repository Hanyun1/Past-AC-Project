const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    value: {
        type: Number,
    },

    when: {
        type: Date,
        default: Date.now,
    },

    comment: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model("time_series", schema);
