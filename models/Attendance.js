const mongoose = require('mongoose');
const Person = require('./Person');

const attendanceSchema = mongoose.Schema({
    person: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    status: String
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;