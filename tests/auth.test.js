const request = require('supertest');
const app = require('../src/app');

describe('Auth', () => {
    it('rejects invalid login', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'nope', password: 'bad' });
        expect(res.status).toBe(401);
        expect(res.body).toHaveProperty('error');
    });
});
