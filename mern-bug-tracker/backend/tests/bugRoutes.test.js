import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bugRoutes from '../routes/bugRoutes.js';
import Bug from '../models/Bug.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI + '_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

afterEach(async () => {
  await Bug.deleteMany();
});

describe('Bug Tracker API', () => {
  it('should create a new bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({
        title: 'Test Bug',
        description: 'Bug created during test',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toBe('Test Bug');
  });

  it('should get all bugs', async () => {
    await Bug.create({ title: 'Bug A', description: 'Desc A' });

    const res = await request(app).get('/api/bugs');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
