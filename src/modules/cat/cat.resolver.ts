import { Resolver, Query, Args } from '@nestjs/graphql';
import { Cat } from '../../schema/cat.model';
import { CatService } from './cat.service';

@Resolver()
export class CatResolver {
  constructor(private catService: CatService) {}

  @Query(() => [Cat], { name: 'cat' })
  async getCats(@Args('name') name: string) {
    return this.catService.getCatsByName(name);
  }
}
