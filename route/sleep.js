const express = require('express');
const SleepRecord = require('../model/sleepRecord');

const router = express.Router();

// POST /sleep
router.post('/', async (req, res) => {
    const { userId, hours, timestamp } = req.body;
    if (!userId || !hours || !timestamp) {
        return res.status(400).json({ error: 'userId, hours, and timestamp are required' });
    }
    try {
        const newRecord = new SleepRecord({
            userId,
            hours,
            timestamp
        });
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /sleep/:userId
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userRecords = await SleepRecord.find({ userId }).sort({ timestamp: 1 });
        res.status(200).json(userRecords);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// DELETE /sleep/:recordId
router.delete('/:recordId', async (req, res) => {
    const { recordId } = req.params;
    console.log('Received recordId:', recordId); 
    try {
        const result = await SleepRecord.deleteOne({ _id: recordId });
        if (result.deletedCount === 0) {
            console.log('Record not found for recordId:', recordId); 
            return res.status(404).json({ error: 'Record not found' });
        }
        console.log('Record deleted successfully:', recordId); 
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting record:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
