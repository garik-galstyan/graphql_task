import { ObjectType } from '@nestjs/graphql';
import { Owner } from './owner.model';
import { Pet } from './pet.interface';

@ObjectType({
  implements: () => [Pet],
})
export class Dog implements Pet {
  id: string;
  name: string;
  owner: Owner;
}
