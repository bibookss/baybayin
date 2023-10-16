import { wordList, vowels } from './words.js';

export class Game {
    constructor() {
        this.word = wordList[Math.floor(Math.random() * wordList.length)];  // Random word from word list
        this.definition = '';  // Definition of the word
        this.wordLength = this.word.length;
        this.index = 0;  // Index of the current character
        this.current_character = ''  // Current character to be written
        this.attemptsLeft = 6;

        // Preprocess the word
        this.preprocessWord();

        // Get the next character
        this.getNextCharacter();
    }

    preprocessWord = function () {
        const word = this.word;        
        const processedWord = word.replace(/[^a-z]/g, '');
        this.word = processedWord;
    }
    
    getNextCharacter = function () {
        console.log('Getting next character...');

        // Clear current character
        this.current_character = '';
        
        // Get the next character
        for (let i = 0; i < 2; i++) {
            if (this.index < this.wordLength || (i == 1 && this.isVowel(this.word[this.index]))) {
                this.current_character += this.word[this.index];
                this.index++;
            }
        }

        // Bold the current character in the word
        const word_div = document.getElementById('word');
        word_div.innerHTML = this.word.replace(this.current_character, `<u><b>${this.current_character}</b></u>`);
    } 

    isVowel = function (letter) {
        return vowels.includes(letter);
    }

    checkAnswer = function (answers) {
        let isCorrect = false;
        for (let i = 0; i < answers.length; i++) {
            let answers_list = answers[i][0].split('_');
            for (let j = 0; j < answers_list.length; j++) {
                console.log(answers_list[j]);
                if (answers_list[j] == this.current_character) {
                    isCorrect = true;
                    break;
                }
            }
        }

        if (!isCorrect) {
            this.attemptsLeft--;
        }

        return isCorrect;
    }

    isGameWon = function () {
        return this.index == this.wordLength && this.attemptsLeft >= 0;
    };
}