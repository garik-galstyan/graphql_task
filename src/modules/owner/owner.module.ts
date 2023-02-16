import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerResolver } from './owner.resolver';

@Module({
  providers: [OwnerService, OwnerResolver],
  exports: [OwnerService],
})
export class OwnerModule {}
