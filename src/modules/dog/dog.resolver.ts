import { Resolver, Query, Args } from '@nestjs/graphql';
import { Dog } from '../../schema/dog.model';
import { DogService } from './dog.service';

@Resolver()
export class DogResolver {
  constructor(private dogService: DogService) {}

  @Query(() => [Dog], { name: 'dog' })
  getDogs(@Args('name') name: string) {
    return this.dogService.getDogsByName(name);
  }
}
