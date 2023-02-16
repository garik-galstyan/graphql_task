import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { IDog, IOwner } from '../src/storage/fake.data';

const dog: IDog = {
  id: 1,
  name: 'Dog 1',
  ownerId: 1,
  woof: true,
};

const owner: IOwner = {
  id: 1,
  name: 'Owner 1',
};

describe('Dog resource', () => {
  let app: INestApplication;
  const gql_path = '/graphql';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('dog', () => {
    it('should get the Dog id by Dog name', () => {
      return request(app.getHttpServer())
        .post(gql_path)
        .send({ query: `{dog(name: "${dog.name}") {id}}` })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.dog).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: dog.id })]),
          );
        });
    });

    it('should get the Dog Owner by Dog name', () => {
      return request(app.getHttpServer())
        .post(gql_path)
        .send({
          query: `{dog(name: "${dog.name}") {id, owner { id, name }}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.dog[0].owner).toEqual(
            expect.objectContaining(owner),
          );
        });
    });
  });
});
