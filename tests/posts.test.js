const request = require('supertest');
const app = require('../src/app');

async function login() {
    const res = await request(app)
        .post('/api/auth/login')
        .send({ username: 'admin', password: 'password' });
    return res.body.token;
}

describe('Posts', () => {
    it('lists posts', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('creates a post when authenticated', async () => {
        const token = await login();
        const res = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'New', body: 'Post' });
        expect(res.status).toBe(201);
        expect(res.body.title).toBe('New');
    });
});
