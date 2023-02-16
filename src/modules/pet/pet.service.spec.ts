import { Test, TestingModule } from '@nestjs/testing';
import { CatModule } from '../cat/cat.module';
import { DogModule } from '../dog/dog.module';
import { OwnerModule } from '../owner/owner.module';
import { PetService } from './pet.service';

describe('PetService', () => {
  let service: PetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PetService],
      imports: [DogModule, CatModule, OwnerModule],
    }).compile();

    service = module.get<PetService>(PetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
