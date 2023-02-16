import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { CatModule } from '../cat/cat.module';
import { DogModule } from '../dog/dog.module';
import { OwnerModule } from '../owner/owner.module';

@Module({
  providers: [PetService, PetResolver],
  imports: [CatModule, DogModule, OwnerModule],
})
export class PetModule {}
