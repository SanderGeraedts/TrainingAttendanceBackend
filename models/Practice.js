const mongoose = require('mongoose');
const Attendance = require('./Attendance');
const deepPopulate = require('mongoose-deep-populate')(mongoose);

const practiceSchema = mongoose.Schema({
    date: Date,
    attendance: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance'
    }]
});

practiceSchema.plugin(deepPopulate);

const Practice = mongoose.model('Practice', practiceSchema);

module.exports = Practice;