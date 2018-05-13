import Mongoose from 'mongoose';
import {Attendance} from './Attendance';

const deepPopulate = require('mongoose-deep-populate')(Mongoose);

const practiceSchema = Mongoose.Schema({
    date: Date,
    attendance: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Attendance'
    }]
});

practiceSchema.plugin(deepPopulate);

export const Practice = Mongoose.model('Practice', practiceSchema);
