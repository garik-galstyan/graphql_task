import { Field, Int, InterfaceType } from '@nestjs/graphql';
import { Cat } from './cat.model';
import { Dog } from './dog.model';
import { Owner } from './owner.model';

@InterfaceType({
  resolveType(pet) {
    if (pet.meow) {
      return Cat;
    }
    if (pet.woof) {
      return Dog;
    }
  },
})
export abstract class Pet {
  @Field(() => Int)
  id: string;

  @Field()
  name: string;

  @Field(() => Owner)
  owner: Owner;
}
