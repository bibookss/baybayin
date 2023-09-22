import { wordList, vowels } from './words.js';

export class Game {
    constructor() {
        this.word = wordList[Math.floor(Math.random() * wordList.length)];
        this.index = 0;
        this.length = this.word.length;
        this.attemptsLeft = 6;
    }

    preprocessWord = function () {
        const word = this.word;        
        const processedWord = word.replace(/[^a-z]/g, '');
        this.word = processedWord;
    }

    isVowel = function (letter) {
        return vowels.includes(letter);
    }

    checkLetter = function (letter) {
        letter = letter.split('_')[0]

        let target = this.word[this.index];
        if (this.index < this.length && !this.isVowel(this.word[this.index]) && this.isVowel(this.word[this.index+1])) {
            target = this.word[this.index] + this.word[this.index+1];
        }
        console.log(target);

        if (target.length > 1 && target.length != 3) {
            if (letter[0] != target[0]) {
                this.attemptsLeft--;
                return false;
            }

            if (letter[1] == target[1]) {
                this.index+=2;
                return true;
            }

            if (letter[1] == 'o' && target[1] == 'u') {
                this.index+=2;
                return true;
            }

            if (letter[1] == 'e' && target[1] == 'i') {
                this.index+=2;
                return true;
            }
        }

        if (letter === target) {
            this.index++;
            return true;
        }

        this.attemptsLeft--;
        return false;
    };

    isGameWon = function () {
        return this.index > this.length;
    };
}