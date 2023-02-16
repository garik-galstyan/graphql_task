import { Injectable } from '@nestjs/common';
import { Storage } from '../../storage';

@Injectable()
export class OwnerService {
  getOwnerById(id: number) {
    return Storage.getOwnerById(id);
  }
}
