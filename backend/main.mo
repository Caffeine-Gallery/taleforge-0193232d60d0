import Char "mo:base/Char";

import Text "mo:base/Text";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Random "mo:base/Random";
import Time "mo:base/Time";
import Iter "mo:base/Iter";

actor {
    public type Abilities = {
        strength: Nat;
        dexterity: Nat;
        constitution: Nat;
        intelligence: Nat;
        wisdom: Nat;
        charisma: Nat;
    };

    public type Character = {
        name: Text;
        race: Text;
        className: Text;
        background: Text;
        age: Nat;
        abilities: Abilities;
    };

    public type CharacterResponse = {
        backstory: Text;
    };

    public type Point = {
        x: Nat;
        y: Nat;
    };

    public type Continent = {
        points: [Point];
    };

    public type Landmark = {
        x: Nat;
        y: Nat;
        name: Text;
    };

    public type MapData = {
        continents: [Continent];
        landmarks: [Landmark];
    };

    public type MapSettings = {
        continentDensity: Nat;
        oceanLevel: Nat;
        landmarkDensity: Nat;
    };

    private let firstNames = [
        "Thorin", "Eldara", "Garrick", "Luna", "Magnus", "Sylva",
        "Thane", "Aria", "Drake", "Lyra", "Finn", "Nova",
        "Raven", "Storm", "Wolf", "Ember", "Ash", "Dawn"
    ];

    private let lastNames = [
        "Ironheart", "Shadowweaver", "Stormwind", "Lightbringer", "Frostborn",
        "Blackthorn", "Swiftsword", "Moonshadow", "Flamekeep", "Starweaver"
    ];

    private let landmarkNames = [
        "Dragon's Peak", "Mystic Grove", "Ancient Ruins",
        "Crystal Cave", "Shadow Valley", "Golden Temple",
        "Storm's End", "Wizard's Tower", "Lost City",
        "Sacred Spring", "Dark Forest", "Eternal Flame"
    ];

    public func generateRandomName() : async Text {
        let now = Int.abs(Time.now());
        let firstNameIndex = now % firstNames.size();
        let lastNameIndex = (now / 1_000_000) % lastNames.size();
        
        firstNames[firstNameIndex] # " " # lastNames[lastNameIndex]
    };

    private func generateRandomPoints(count: Nat, maxX: Nat, maxY: Nat) : [Point] {
        let now = Int.abs(Time.now());
        var points : [Point] = [];
        
        for (i in Iter.range(0, count - 1)) {
            let x = (now + i * 12345) % maxX;
            let y = (now + i * 67890) % maxY;
            points := Array.append(points, [{ x = x; y = y }]);
        };
        
        points
    };

    public shared func generateMapData(settings: MapSettings) : async MapData {
        let continentCount = settings.continentDensity * 2;
        let landmarkCount = settings.landmarkDensity * 3;
        
        // Generate continents
        var continents : [Continent] = [];
        for (i in Iter.range(0, continentCount - 1)) {
            let pointCount = 5 + (i % 3);
            let points = generateRandomPoints(pointCount, 800, 600);
            continents := Array.append(continents, [{ points = points }]);
        };
        
        // Generate landmarks
        let landmarks = Array.tabulate<Landmark>(landmarkCount, func(i) {
            let points = generateRandomPoints(1, 800, 600);
            {
                x = points[0].x;
                y = points[0].y;
                name = landmarkNames[i % landmarkNames.size()];
            }
        });
        
        {
            continents = continents;
            landmarks = landmarks;
        }
    };

    private func generateBackstoryText(char: Character) : Text {
        let introText = "In the realm of fantasy, ";
        
        let raceText = switch(char.race) {
            case "human" "a versatile human ";
            case "elf" "a graceful elf ";
            case "dwarf" "a sturdy dwarf ";
            case "halfling" "a nimble halfling ";
            case "dragonborn" "a proud dragonborn ";
            case _ "an adventurer ";
        };

        let classText = switch(char.className) {
            case "fighter" "trained in the art of combat ";
            case "wizard" "versed in the arcane arts ";
            case "rogue" "skilled in stealth and cunning ";
            case "cleric" "blessed by divine powers ";
            case "ranger" "attuned to nature and survival ";
            case _ "skilled in various arts ";
        };

        let backgroundText = switch(char.background) {
            case "acolyte" "who grew up serving in a temple";
            case "criminal" "with a mysterious past in the shadows";
            case "noble" "born to privilege and responsibility";
            case "soldier" "who served in many battles";
            case "sage" "who spent years studying ancient lore";
            case _ "with an intriguing history";
        };

        let abilityText = if (char.abilities.strength > 15) {
            " Blessed with extraordinary strength,"
        } else if (char.abilities.intelligence > 15) {
            " Gifted with remarkable intelligence,"
        } else if (char.abilities.charisma > 15) {
            " Possessing natural charisma,"
        } else {
            " With balanced abilities,"
        };

        let nameText = " " # char.name;
        let ageText = " at the age of " # Nat.toText(char.age);

        let questText = " now seeks adventure and glory in the vast world. ";

        let personalityText = if (char.abilities.wisdom > 12) {
            "Wisdom guides their path as they face the challenges ahead."
        } else if (char.abilities.dexterity > 12) {
            "Their natural agility serves them well in their adventures."
        } else {
            "Their determination drives them forward into the unknown."
        };

        return introText # raceText # classText # backgroundText # "," # nameText # 
               ageText # abilityText # questText # personalityText;
    };

    public shared func generateCharacter(char: Character) : async CharacterResponse {
        let backstory = generateBackstoryText(char);
        return {
            backstory = backstory;
        };
    };
}
