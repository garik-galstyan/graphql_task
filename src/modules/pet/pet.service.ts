import { Injectable } from '@nestjs/common';
import { CatService } from '../cat/cat.service';
import { DogService } from '../dog/dog.service';
import { OwnerService } from '../owner/owner.service';

@Injectable()
export class PetService {
  constructor(
    private dogsService: DogService,
    private catsService: CatService,
    private ownersService: OwnerService,
  ) {}

  getPetsByName(name: string) {
    return [
      ...this.dogsService.getDogsByName(name),
      ...this.catsService.getCatsByName(name),
    ];
  }

  getOwnerById(id: number) {
    return this.ownersService.getOwnerById(id);
  }
}
