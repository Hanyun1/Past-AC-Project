const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    when: {
        type: Date,
        default: Date.now(),
    },

    note: {
        type: String,
        maxlength: 100,
        default: null,
    },
});

module.exports = mongoose.model("clinical_notes", schema);
