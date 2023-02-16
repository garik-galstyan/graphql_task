import { Test, TestingModule } from '@nestjs/testing';
import { PetResolver } from './pet.resolver';
import { ICat, IDog, IOwner, PetDataType } from '../../storage/fake.data';
import { PetService } from './pet.service';

const mockCat: ICat = {
  id: 1,
  name: 'Cat',
  ownerId: 1,
  meow: false,
};

const mockDog: IDog = {
  id: 1,
  name: 'Dog',
  ownerId: 1,
  woof: false,
};

const mockPets: PetDataType[] = [mockCat, mockDog];

const mockOwner: IOwner = {
  id: 1,
  name: 'Owner',
};

const petServiceMock = {
  getPetsByName: jest.fn((): PetDataType[] => mockPets),
  getOwnerById: jest.fn((): IOwner => mockOwner),
};

describe('PetResolver', () => {
  let resolver: PetResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PetResolver,
        { provide: PetService, useValue: petServiceMock },
      ],
    }).compile();

    resolver = module.get<PetResolver>(PetResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should return Cat object in array', () => {
    const result = resolver.getPets('Cat');
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining(mockCat)]),
    );
  });

  it('should return Dog object in array', () => {
    const result = resolver.getPets('Dog');
    expect(result).toEqual(
      expect.arrayContaining([expect.objectContaining(mockDog)]),
    );
  });

  it('should return Owner using Pet data', () => {
    const result = resolver.getOwner(mockCat);
    expect(result).toEqual(expect.objectContaining(mockOwner));
  });
});
