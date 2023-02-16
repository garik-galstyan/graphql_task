import { Resolver, ResolveField, Args, Query, Parent } from '@nestjs/graphql';
import { Owner } from '../../schema/owner.model';
import { Pet } from '../../schema/pet.interface';
import { PetService } from './pet.service';
import { Storage } from '../../storage';

@Resolver(() => Pet)
export class PetResolver {
  constructor(private petService: PetService) {}

  @Query(() => [Pet], { name: 'pet' })
  getPets(@Args('name') name: string) {
    return this.petService.getPetsByName(name);
  }

  @ResolveField('owner', () => Owner)
  getOwner(@Parent() pet: Storage.PetDataType) {
    return this.petService.getOwnerById(pet.ownerId);
  }
}
