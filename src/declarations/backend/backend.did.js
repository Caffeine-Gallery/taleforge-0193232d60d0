export const idlFactory = ({ IDL }) => {
  const Abilities = IDL.Record({
    'dexterity' : IDL.Nat,
    'wisdom' : IDL.Nat,
    'strength' : IDL.Nat,
    'charisma' : IDL.Nat,
    'constitution' : IDL.Nat,
    'intelligence' : IDL.Nat,
  });
  const Character = IDL.Record({
    'age' : IDL.Nat,
    'background' : IDL.Text,
    'name' : IDL.Text,
    'race' : IDL.Text,
    'abilities' : Abilities,
    'className' : IDL.Text,
  });
  const CharacterResponse = IDL.Record({ 'backstory' : IDL.Text });
  return IDL.Service({
    'generateCharacter' : IDL.Func([Character], [CharacterResponse], []),
  });
};
export const init = ({ IDL }) => { return []; };
