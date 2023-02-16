import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { PetModule } from './modules/pet/pet.module';
import { DogModule } from './modules/dog/dog.module';
import { CatModule } from './modules/cat/cat.module';
import { OwnerModule } from './modules/owner/owner.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PetModule,
    DogModule,
    CatModule,
    OwnerModule,
  ],
})
export class AppModule {}
