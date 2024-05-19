const mongoose = require('mongoose');

const sleepRecordSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    hours: { type: Number, required: true },
    timestamp: { type: Date, required: true },
});

const SleepRecord = mongoose.model('SleepRecord', sleepRecordSchema);

module.exports = SleepRecord;
