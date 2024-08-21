const exphbs = require("express-handlebars");

const hbs = exphbs.create({
    defaultlayout: "main",
    extname: "hbs",

    // helper functions
    helpers: {
        showColor: function (record) {
            if (!record.is_required) {
                return false;
            } else {
                if (record.record.length == 0) return true;
                const data = record.record[record.record.length - 1];
                if (!data.when instanceof Date) {
                    return true;
                } else {
                    if (hbs.helpers.isToday(data.when)) {
                        if (
                            data.value >= record.safe_threshold_min &&
                            data.value <= record.safe_threshold_max
                        ) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            }
        },

        showText: function (record) {
            if (!record.is_required) {
                return "not required";
            } else {
                if (record.record.length == 0) return "--";
                const data = record.record[record.record.length - 1];
                if (!data.when instanceof Date) {
                    return data.value + "(date not defined)";
                } else {
                    if (hbs.helpers.isToday(data.when)) {
                        return data.value;
                    } else {
                        return "--";
                    }
                }
            }
        },

        hasTodayData: function (record) {
            if (record.record.length == 0) return false;
            const data = record.record[record.record.length - 1];
            if (hbs.helpers.isToday(data.when)) {
                return true;
            } else {
                return false;
            }
        },

        isToday: function (date) {
            const today = new Date();
            return (
                date.getDate() == today.getDate() &&
                date.getMonth() == today.getMonth() &&
                date.getFullYear() == today.getFullYear()
            );
        },

        getAge: function (year) {
            const today = new Date();
            return today.getFullYear() - year;
        },

        nodata: function (array) {
            return array.length == 0;
        },

        showDate: function (date) {
            return (
                date.getFullYear() +
                "-" +
                (date.getMonth() + 1) +
                "-" +
                date.getDate()
            );
        },

        showComment: function (array) {
            if (array.length == 0) return "";
            const data = array[array.length - 1];
            if (!data.when instanceof Date) {
                return "";
            } else {
                if (hbs.helpers.isToday(data.when)) {
                    if (data.comment) {
                        return data.comment;
                    } else {
                        return "--";
                    }
                } else {
                    return "";
                }
            }
        },

        IsValidBadge: function (rate) {
            if (rate >= 80) {
                return true;
            } else {
                return false;
            }
        },

        Top1: function (array) {
            return array[0];
        },

        Rest: function (array) {
            return array.slice(1);
        },

        Rank: function (index) {
            return index + 2;
        },
    },
});

module.exports = hbs;
