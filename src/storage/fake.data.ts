export interface ICat {
  id: number;
  name: string;
  ownerId: number;
  meow: boolean;
}

export interface IDog {
  id: number;
  name: string;
  ownerId: number;
  woof: boolean;
}

export interface IOwner {
  id: number;
  name: string;
}

export type PetDataType = ICat | IDog;

const cats: ICat[] = [
  {
    id: 1,
    name: 'Cat 1',
    ownerId: 1,
    meow: true,
  },
  {
    id: 2,
    name: 'Cat 2',
    ownerId: 1,
    meow: true,
  },
  {
    id: 3,
    name: 'Cat 3',
    ownerId: 2,
    meow: true,
  },
  {
    id: 4,
    name: 'Cat 4',
    ownerId: 3,
    meow: true,
  },
];

const dogs: IDog[] = [
  {
    id: 1,
    name: 'Dog 1',
    ownerId: 1,
    woof: true,
  },
  {
    id: 2,
    name: 'Dog 2',
    ownerId: 2,
    woof: true,
  },
  {
    id: 3,
    name: 'Dog 3',
    ownerId: 2,
    woof: true,
  },
  {
    id: 4,
    name: 'Dog 4',
    ownerId: 3,
    woof: true,
  },
];

const owners: IOwner[] = [
  {
    id: 1,
    name: 'Owner 1',
  },
  {
    id: 2,
    name: 'Owner 2',
  },
  {
    id: 3,
    name: 'Owner 3',
  },
];

export function getCatsByName(name: string) {
  return cats.filter((cat) => cat.name.includes(name));
}

export function getDogsByName(name: string) {
  return dogs.filter((dog) => dog.name.includes(name));
}

export function getOwnerById(id: number) {
  return owners.find((owner) => owner.id === id);
}
