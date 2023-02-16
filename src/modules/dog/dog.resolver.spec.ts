import { Test, TestingModule } from '@nestjs/testing';
import { IDog } from '../../storage/fake.data';
import { DogResolver } from './dog.resolver';
import { DogService } from './dog.service';

const mockDog: IDog = {
  id: 1,
  name: 'Dog',
  ownerId: 1,
  woof: true,
};

const dogServiceMock = {
  getDogsByName: jest.fn((): IDog[] => [mockDog]),
};

describe('DogResolver', () => {
  let resolver: DogResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DogResolver,
        { provide: DogService, useValue: dogServiceMock },
      ],
    }).compile();

    resolver = module.get<DogResolver>(DogResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return Dog object in array', () => {
    const result = resolver.getDogs('Dog');
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining(mockDog)]),
    );
  });
});
