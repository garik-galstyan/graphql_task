import { Module } from '@nestjs/common';
import { DogService } from './dog.service';
import { DogResolver } from './dog.resolver';

@Module({
  providers: [DogService, DogResolver],
  exports: [DogService],
})
export class DogModule {}
