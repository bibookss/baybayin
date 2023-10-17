import { getRandomWord } from "./api.js";

export class Game {
    constructor() {
        this.initializeGame();

        console.log('Game initialized!');
        console.log('Word:', this.word);
        console.log('Word length:', this.wordLength);
        console.log('Index:', this.index);
    }

    async initializeGame() {
        try {
            const randomWordData = await getRandomWord();
            this.word = randomWordData['word']  // Word to be guessed
            this.wordLength = this.word.length;
            this.index = 0;  // Index of the current character
            this.current_character = '';  // Current character to be written

            // Preprocess the word
            this.preprocessWord();

            // Get the next character
            this.getNextCharacter();
        } catch (error) {
            console.error('Error initializing game:', error);
            // Handle the error, e.g., show an error message to the user
        }
    }

    preprocessWord = function () {
        const word = this.word;        
        const processedWord = word.replace(/[^a-z]/g, '');
        this.word = processedWord;
    }
    
    getNextCharacter = function () {
        console.log('Getting next character...');
        console.log('Index:', this.index);
        console.log('Word length:', this.wordLength);
        console.log('Word:', this.word);
        
        // Clear current character
        this.current_character = '';
        
        // Get first character
        if (this.index < this.wordLength) {
            this.current_character += this.word[this.index];
            this.index++;
        }

        // Get second character
        if (this.index < this.wordLength) {
            if (this.isVowel(this.word[this.index]) && !this.isVowel(this.current_character[0]) || (this.word[this.index-1] == 'n' && this.word[this.index] == 'g')) {
                this.current_character += this.word[this.index];
                this.index++;
            }
        }

        // Get third character
        if (this.index < this.wordLength) {
            if (this.current_character.length == 2 && this.current_character[1] == 'g') {
                if (this.isVowel(this.word[this.index])) {
                    this.current_character += this.word[this.index];
                    this.index++;
                }
            }
        }

        // Bold the current character in the word
        const word_div = document.getElementById('word');
        const cc_length = this.current_character.length;
        const start_index = this.index - cc_length;

        // Make the characters from start_index to index-1 bold
        let new_word = '';
        for (let i = 0; i < this.word.length; i++) {
            if (i >= start_index && i < this.index) {
                new_word += `<b>${this.word[i]}</b>`;
            } else {
                new_word += this.word[i];
            }
        }

        word_div.innerHTML = new_word;

        console.log('Current character:', this.current_character);
    } 

    isVowel = function (letter) {
        const vowels = [
            'a', 'e', 'i', 'o', 'u'
        ];
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

        return isCorrect;
    }

    isGameWon = function () {
        return this.index == this.wordLength;
    };
}