import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ICat, IOwner } from '../src/storage/fake.data';

const cat: ICat = {
  id: 1,
  name: 'Cat 1',
  ownerId: 1,
  meow: true,
};

const owner: IOwner = {
  id: 1,
  name: 'Owner 1',
};

describe('Cat resource', () => {
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

  describe('cat', () => {
    it('should get the Cat id by Cat name', () => {
      return request(app.getHttpServer())
        .post(gql_path)
        .send({ query: `{cat(name: "${cat.name}") {id}}` })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.cat).toEqual(
            expect.arrayContaining([expect.objectContaining({ id: cat.id })]),
          );
        });
    });

    it('should get the Cat Owner by Cat name', () => {
      return request(app.getHttpServer())
        .post(gql_path)
        .send({
          query: `{cat(name: "${cat.name}") {id, owner { id, name }}}`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.cat[0].owner).toEqual(
            expect.objectContaining(owner),
          );
        });
    });
  });
});
