import { ADMIN_EMAIL, ADMIN_PASSWORD, APP_URL } from '../utils/constants';
import request from 'supertest';

const app = APP_URL;
describe('Locus (e2e)', () => {
  describe('Locus with Admin User', () => {
    let adminApiToken;

    beforeAll(async () => {
      await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
        .then(({ body }) => {
          adminApiToken = body.token;
        });
    });

    it('Get all locus: /api/v1/locus (GET)', () => {
      return request(app)
        .get('/api/v1/locus')
        .query({
          sideload: 'locusMember',
          page: 1,
          limit: 10,
        })
        .auth(adminApiToken, {
          type: 'bearer',
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data).toBeDefined();
          expect(body.data.length).toBe(10);
        });
    });
  });

  describe('Locus with Normal User', () => {
    let normalApiToken;

    beforeAll(async () => {
      await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: 'normal@example.com', password: 'secret' })
        .then(({ body }) => {
          normalApiToken = body.token;
        });
    });
    it('Get all locus NORMAL: /api/v1/locus (GET)', () => {
      return request(app)
        .get('/api/v1/locus')
        .query({
          sideload: 'locusMember',
          page: 1,
          limit: 10,
        })
        .auth(normalApiToken, {
          type: 'bearer',
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data).toBeDefined();
          expect(body.data.length).toBe(10);
        });
    });
  });

  describe('Locus with Limited User', () => {
    let limitedApiToken;

    beforeAll(async () => {
      await request(app)
        .post('/api/v1/auth/email/login')
        .send({ email: 'limited@example.com', password: 'secret' })
        .then(({ body }) => {
          limitedApiToken = body.token;
        });
    });

    // limited user can get data only for regionId in (86118093,86696489,88186467)
    it('Get all locus LIMITED success: /api/v1/locus (GET)', () => {
      return request(app)
        .get('/api/v1/locus')
        .query({
          regionId: 86118093,
          sideload: 'locusMember',
          page: 1,
          limit: 10,
        })
        .auth(limitedApiToken, {
          type: 'bearer',
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.data).toBeDefined();
          expect(body.data.length).toBe(10);
        });
    });

    it('Get all locus LIMITED fail: /api/v1/locus (GET)', () => {
      return request(app)
        .get('/api/v1/locus')
        .query({
          regionId: 123,
          sideload: 'locusMember',
          page: 1,
          limit: 10,
        })
        .auth(limitedApiToken, {
          type: 'bearer',
        })
        .expect(200)
        .expect(({ body }) => {
          expect(body.message).toBe(
            'Forbidden, can only access limited regions.',
          );
        });
    });
  });
});
