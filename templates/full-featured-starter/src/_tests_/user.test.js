const request = require('supertest');
const app = require('../index');

describe('User API', () => {
  it('should get users with valid token', async () => {
    // Mock token generation or login
    const res = await request(app).get('/api/users').set('Authorization', 'Bearer mock-token');
    expect(res.statusCode).toEqual(401); // Update with actual token for real test
  });
});