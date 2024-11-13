import { backend } from "declarations/backend";

let currentStep = 1;
const totalSteps = 6;
const character = {};

function updateProgress() {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.querySelector('.progress-bar').style.width = `${progress}%`;
}

function showStep(step) {
    document.querySelectorAll('.step').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelector(`.step[data-step="${step}"]`).style.display = 'block';
    
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    
    prevBtn.style.display = step === 1 ? 'none' : 'block';
    nextBtn.style.display = step === totalSteps ? 'none' : 'block';
    finishBtn.style.display = step === totalSteps ? 'block' : 'none';
    
    updateProgress();
}

function validateStep(step) {
    switch(step) {
        case 1:
            return document.getElementById('race').value !== '';
        case 2:
            return document.getElementById('class').value !== '';
        case 3:
            return ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
                .every(ability => document.getElementById(ability).value !== '');
        case 4:
            return document.getElementById('background').value !== '';
        case 5:
            return document.getElementById('characterName').value !== '' && 
                   document.getElementById('age').value !== '';
        default:
            return true;
    }
}

function rollAbilityScores() {
    const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    abilities.forEach(ability => {
        const rolls = Array.from({length: 4}, () => Math.floor(Math.random() * 6) + 1);
        rolls.sort((a, b) => b - a);
        const total = rolls.slice(0, 3).reduce((sum, roll) => sum + roll, 0);
        document.getElementById(ability).value = total;
    });
}

async function generateRandomName() {
    const nameInput = document.getElementById('characterName');
    try {
        const name = await backend.generateRandomName();
        nameInput.value = name;
    } catch (error) {
        console.error('Error generating name:', error);
    }
}

async function generateCharacter() {
    const loadingBackstory = document.getElementById('loadingBackstory');
    const characterSummary = document.getElementById('characterSummary');
    const backstoryElement = document.getElementById('backstory');
    
    loadingBackstory.style.display = 'block';
    characterSummary.innerHTML = '';
    backstoryElement.innerHTML = '';

    const character = {
        name: document.getElementById('characterName').value,
        race: document.getElementById('race').value,
        className: document.getElementById('class').value,
        background: document.getElementById('background').value,
        age: parseInt(document.getElementById('age').value),
        abilities: {
            strength: parseInt(document.getElementById('strength').value),
            dexterity: parseInt(document.getElementById('dexterity').value),
            constitution: parseInt(document.getElementById('constitution').value),
            intelligence: parseInt(document.getElementById('intelligence').value),
            wisdom: parseInt(document.getElementById('wisdom').value),
            charisma: parseInt(document.getElementById('charisma').value)
        }
    };

    try {
        const result = await backend.generateCharacter(character);
        
        characterSummary.innerHTML = `
            <h4 class="mb-4">${character.name}</h4>
            <p class="lead">Level 1 ${character.race} ${character.className}</p>
            <p>Background: ${character.background}</p>
            <p>Age: ${character.age}</p>
            <h5 class="mt-4">Ability Scores:</h5>
            <ul class="list-group">
                <li class="list-group-item">Strength: ${character.abilities.strength}</li>
                <li class="list-group-item">Dexterity: ${character.abilities.dexterity}</li>
                <li class="list-group-item">Constitution: ${character.abilities.constitution}</li>
                <li class="list-group-item">Intelligence: ${character.abilities.intelligence}</li>
                <li class="list-group-item">Wisdom: ${character.abilities.wisdom}</li>
                <li class="list-group-item">Charisma: ${character.abilities.charisma}</li>
            </ul>
        `;
        
        backstoryElement.innerHTML = `
            <h5 class="mt-4">Character Backstory:</h5>
            <div class="card">
                <div class="card-body">
                    <p class="lead">${result.backstory}</p>
                </div>
            </div>
        `;
    } catch (error) {
        backstoryElement.innerHTML = `<p class="text-danger">Error generating character: ${error.message}</p>`;
    } finally {
        loadingBackstory.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const finishBtn = document.getElementById('finishBtn');
    const rollDiceBtn = document.getElementById('rollDice');
    const generateNameBtn = document.getElementById('generateName');

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            if (currentStep < totalSteps) {
                currentStep++;
                showStep(currentStep);
            }
        } else {
            alert('Please fill in all required fields before proceeding.');
        }
    });

    finishBtn.addEventListener('click', generateCharacter);
    rollDiceBtn.addEventListener('click', rollAbilityScores);
    generateNameBtn.addEventListener('click', generateRandomName);

    showStep(1);
});
