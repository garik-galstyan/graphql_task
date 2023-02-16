import { Test, TestingModule } from '@nestjs/testing';
import { ICat } from '../../storage/fake.data';
import { CatResolver } from './cat.resolver';
import { CatService } from './cat.service';

const mockCat: ICat = {
  id: 1,
  name: 'Cat',
  ownerId: 1,
  meow: true,
};

const catServiceMock = {
  getCatsByName: jest.fn((): ICat[] => [mockCat]),
};

describe('CatResolver', () => {
  let resolver: CatResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatResolver,
        { provide: CatService, useValue: catServiceMock },
      ],
    }).compile();

    resolver = module.get<CatResolver>(CatResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return Cat object in array', () => {
    const result = resolver.getCats('Cat');
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining(mockCat)]),
    );
  });
});
