import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Abilities {
  'dexterity' : bigint,
  'wisdom' : bigint,
  'strength' : bigint,
  'charisma' : bigint,
  'constitution' : bigint,
  'intelligence' : bigint,
}
export interface Character {
  'age' : bigint,
  'background' : string,
  'name' : string,
  'race' : string,
  'abilities' : Abilities,
  'className' : string,
}
export interface CharacterResponse { 'backstory' : string }
export interface Continent { 'points' : Array<Point> }
export interface Landmark { 'x' : bigint, 'y' : bigint, 'name' : string }
export interface MapData {
  'landmarks' : Array<Landmark>,
  'continents' : Array<Continent>,
}
export interface MapSettings {
  'oceanLevel' : bigint,
  'continentDensity' : bigint,
  'landmarkDensity' : bigint,
}
export interface Point { 'x' : bigint, 'y' : bigint }
export interface _SERVICE {
  'generateCharacter' : ActorMethod<[Character], CharacterResponse>,
  'generateMapData' : ActorMethod<[MapSettings], MapData>,
  'generateRandomName' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
