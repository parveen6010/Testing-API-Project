const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const SleepRecord = require('../model/sleepRecord');

describe('Sleep Tracker API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await SleepRecord.deleteMany({});
    });

    test('POST /sleep - success', async () => {
        const response = await request(app)
            .post('/sleep')
            .send({ userId: 'user1', hours: 8, timestamp: '2023-05-18T07:00:00Z' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.userId).toBe('user1');
    });

    test('GET /sleep/:userId - success', async () => {
        await new SleepRecord({ userId: 'user1', hours: 8, timestamp: '2023-05-18T07:00:00Z' }).save();
        const response = await request(app).get('/sleep/user1');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('userId', 'user1');
    });

    test('DELETE /sleep/:recordId - success', async () => {
        const record = await new SleepRecord({ userId: 'user1', hours: 8, timestamp: '2023-05-18T07:00:00Z' }).save();
        const response = await request(app).delete(`/sleep/${record._id}`); // Pass the correct record id
        expect(response.status).toBe(204);
    });

    test('DELETE /sleep/:recordId - record not found', async () => {
        const nonExistentRecordId = '605c72ef1f1f1f1f1f1f1f1f'; // Provide a non-existent record id
        const response = await request(app).delete(`/sleep/${nonExistentRecordId}`);
        expect(response.status).toBe(404);
    });
});
