import request from 'supertest';
import { Test } from '@nestjs/testing';
import { CanActivate, INestApplication } from '@nestjs/common';
import { customer1 } from '../mocks/customer-mock';
import { AppModule } from '../.../../../../../src/app.module';
import { JwtAuthMiddleware } from '@common/auth/services/jwt-auth.middleware.service';
import DITokens from '@common/enums/DITokens';

jest.setTimeout(1000);

let app: INestApplication;

describe('Customer', () => {
  const customerDatabaseMock = {
    getById: (id: string) => {
      if (id === 'undefined') return null;
      return customer1;
    },
    update: (data: any) => data,
    create: (data: any) => customer1,
  };

  beforeAll(async () => {
    const mock_JwtAuth: CanActivate = {
      canActivate: jest.fn(() => true),
    };

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(JwtAuthMiddleware)
      .useValue(mock_JwtAuth)
      .overrideProvider(DITokens.CustomerDatabaseDao)
      .useValue(customerDatabaseMock)
      .compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  it('[GET] /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({
        message: 'Customer API - ' + process.env.NODE_ENV.toUpperCase(),
        status: 'OK',
        version: process.env.npm_package_version,
      });
  });

  describe('[GET] /customers/:id', async () => {
    it(`Should return customer`, async () => {
      const id = customer1.id;

      return request(app.getHttpServer())
        .get(`/customers/${id}`)
        .auth('token', {
          type: 'bearer',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(customer1);
        });
    });

    it(`Should not return customer`, () => {
      return request(app.getHttpServer())
        .get(`/customers/undefined`)
        .auth('token', {
          type: 'bearer',
        })
        .expect(404);
    });
  });

  describe('[POST] /customers', async () => {
    it('Should return new customer', async () => {
      return request(app.getHttpServer())
        .post(`/customers`)
        .send({
          name: customer1.name,
          document: customer1.document,
        })
        .auth('token', {
          type: 'bearer',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toEqual(customer1);
        });
    });
  });

  describe('[PATCH] /customers/:id', async () => {
    it('Should return updated customer', async () => {
      const data = {
        id: customer1.id,
        name: 'meu novo nome',
        document: 82213856036,
      };

      return request(app.getHttpServer())
        .patch(`/customers/${customer1.id}`)
        .send(data)
        .auth('token', {
          type: 'bearer',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(data);
        });
    });

    it('Should not updated customer when id is conflict', async () => {
      const data = {
        id: customer1.id,
        name: 'meu novo nome',
        document: 82213856036,
      };

      return request(app.getHttpServer())
        .patch(`/customers/undefined`)
        .send(data)
        .auth('token', {
          type: 'bearer',
        })
        .expect(409);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
