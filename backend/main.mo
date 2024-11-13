import Char "mo:base/Char";

import Text "mo:base/Text";
import Array "mo:base/Array";
import Int "mo:base/Int";
import Nat "mo:base/Nat";

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

    // Helper function to generate background story based on character traits
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
