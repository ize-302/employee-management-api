import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('EmployeesController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/employees (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/employees')
      .send({
        first_name: 'John',
        last_name: 'Doe',
        role: 'Accountant',
      })
      .expect(201);
    console.log(res);
    expect(res.body).toHaveProperty('id');
    expect(res.body.first_name).toBe('John');
  });

  it('/employees/:id (GET)', async () => {
    const created = await request(app.getHttpServer())
      .post('/employees')
      .send({ first_name: 'Jane', last_name: 'Smith', role: 'Designer' })
      .expect(201);

    const employeeId = created.body.id;
    const res = await request(app.getHttpServer())
      .get(`/employees/${employeeId}`)
      .expect(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.first_name).toBe('Jane');
  });

  it('/employees/:id (PUT)', async () => {
    const created = await request(app.getHttpServer())
      .post('/employees')
      .send({ first_name: 'Jane', last_name: 'Smith', role: 'Designer' })
      .expect(201);

    const employeeId = created.body.id;

    const res = await request(app.getHttpServer())
      .put(`/employees/${employeeId}`)
      .send({ first_name: 'Halimah' })
      .expect(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body.first_name).toBe('Halimah');
  });

  it('/employees/:id (DELETE)', async () => {
    const created = await request(app.getHttpServer())
      .post('/employees')
      .send({ first_name: 'Jane', last_name: 'Smith', role: 'Designer' })
      .expect(201);

    const employeeId = created.body.id;

    await request(app.getHttpServer())
      .delete(`/employees/${employeeId}`)
      .expect(200);
  });

  it('/employees (GET)', () => {
    return request(app.getHttpServer()).get('/employees').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
