export enum CharacterStatus {
  ALIVE = 'alive',
  DEAD = 'dead',
  UNKNOWN = 'unknown',
}

export enum CharacterGender {
  FEMALE = 'female',
  MALE = 'male',
  GENDERLESS = 'genderless',
  UNKNOWN = 'unknown',
}

export enum CharacterSpecies {
  HUMAN = 'Human',
  ALIEN = 'Alien',
  HUMANOID = 'Humanoid',
  POOPYBUTTHOLE = 'Poopybutthole',
  MYTHOLOGICAL = 'Mythological',
  UNKNOWN = 'Unknown',
  ANIMAL = 'Animal',
  DISEASE = 'Disease',
  ROBOT = 'Robot',
  CRONENBERG = 'Cronenberg',
  PLANET = 'Planet',
}

export const STATUS_FILTERS: CharacterStatus[] = Object.values(CharacterStatus);
export const GENDER_FILTERS: CharacterGender[] = Object.values(CharacterGender);
export const SPECIES_FILTERS: CharacterSpecies[] = Object.values(CharacterSpecies);

interface ResourceLink {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: CharacterSpecies;
  type: string;
  gender: CharacterGender;
  origin: ResourceLink;
  location: ResourceLink;
  image: string;
  episode: string[]; 
  url: string; 
  created: string; 
}