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
export interface _SERVICE {
  'generateCharacter' : ActorMethod<[Character], CharacterResponse>,
  'generateRandomName' : ActorMethod<[], string>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
