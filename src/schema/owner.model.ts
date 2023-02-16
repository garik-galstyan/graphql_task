import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Owner {
  @Field(() => Int)
  id: string;

  @Field()
  name: string;
}
