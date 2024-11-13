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
  const MapSettings = IDL.Record({
    'oceanLevel' : IDL.Nat,
    'continentDensity' : IDL.Nat,
    'landmarkDensity' : IDL.Nat,
  });
  const Landmark = IDL.Record({
    'x' : IDL.Nat,
    'y' : IDL.Nat,
    'name' : IDL.Text,
  });
  const Point = IDL.Record({ 'x' : IDL.Nat, 'y' : IDL.Nat });
  const Continent = IDL.Record({ 'points' : IDL.Vec(Point) });
  const MapData = IDL.Record({
    'landmarks' : IDL.Vec(Landmark),
    'continents' : IDL.Vec(Continent),
  });
  return IDL.Service({
    'generateCharacter' : IDL.Func([Character], [CharacterResponse], []),
    'generateMapData' : IDL.Func([MapSettings], [MapData], []),
    'generateRandomName' : IDL.Func([], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
