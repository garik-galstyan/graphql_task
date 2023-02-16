import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ICat, IDog, IOwner } from '../src/storage/fake.data';

const cat: ICat = {
  id: 1,
  name: 'Cat 1',
  ownerId: 1,
  meow: true,
};

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

describe('Pet resource', () => {
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

  describe('pet', () => {
    it('should get the Cat id by Cat name', () => {
      return request(app.getHttpServer())
        .post(gql_path)
        .send({ query: `{pet(name: "${cat.name}") {id}}` })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.pet).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: cat.id })]),
          );
        });
    });

    it('should get the Dog id by Dog name', () => {
      return request(app.getHttpServer())
        .post(gql_path)
        .send({ query: `{pet(name: "${dog.name}") {id}}` })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.pet).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: dog.id })]),
          );
        });
    });

    it('should get the Dog and Cat id having same string in name', () => {
      return request(app.getHttpServer())
        .post(gql_path)
        .send({ query: `{pet(name: " 1") {id}}` })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.pet).toEqual(
            expect.arrayContaining([{ id: cat.id }, { id: dog.id }]),
          );
        });
    });

    it('should get the Dog and Cat with correct __typename', () => {
      return request(app.getHttpServer())
        .post(gql_path)
        .send({ query: `{pet(name: " 1") {__typename}}` })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.pet).toEqual(
            expect.arrayContaining([
              { __typename: 'Cat' },
              { __typename: 'Dog' },
            ]),
          );
        });
    });

    it('should get the Dog and Cat with owner object', () => {
      return request(app.getHttpServer())
        .post(gql_path)
        .send({ query: `{pet(name: " 1") {owner{id, name}}}` })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.pet[0].owner).toEqual(
            expect.objectContaining(owner),
          );
          expect(res.body.data.pet[1].owner).toEqual(
            expect.objectContaining(owner),
          );
        });
    });
  });
});
