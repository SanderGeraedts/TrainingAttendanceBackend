import Mongoose from 'mongoose';

const attendanceSchema = Mongoose.Schema({
    person: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    status: String
});

export const Attendance = Mongoose.model('Attendance', attendanceSchema);
