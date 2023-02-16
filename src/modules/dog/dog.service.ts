import { Injectable } from '@nestjs/common';
import { Storage } from '../../storage';

@Injectable()
export class DogService {
  getDogsByName(name: string) {
    return Storage.getDogsByName(name);
  }
}
