import { Injectable } from '@nestjs/common';
import { Storage } from '../../storage';

@Injectable()
export class CatService {
  getCatsByName(name: string) {
    return Storage.getCatsByName(name);
  }
}
