let randomNumber = Math.floor(Math.random() * 100) + 1;

// ✅ Select required DOM elements
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessfield');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.remaining');
const lowOrHigh = document.querySelector('.lowOrHigh');
const startOver = document.querySelector('.result'); // Corrected selector

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

// ✅ Main submit button logic
if (playGame) {
    submit.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

// ✅ Validation logic
function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number more than 1');
    } else if (guess > 100) {
        alert('Please enter a number less than 100');
    } else {
        prevGuess.push(guess);
        if (numGuess === 11) {
            displayGuess(guess);
            displayMessage(`Game Over. The number was ${randomNumber}`);
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

// ✅ Guess checking logic
function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage('🎉 You guessed it right!');
        endGame();
    } else if (guess < randomNumber) {
        displayMessage('📉 Number is too low');
    } else if (guess > randomNumber) {
        displayMessage('📈 Number is too high');
    }
}

// ✅ Update display with guess info
function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess} `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

// ✅ Feedback message
function displayMessage(message) {
    lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

// ✅ Start new game logic
function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function () {
        randomNumber = Math.floor(Math.random() * 100) + 1;
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
        displayMessage('');
    });
}

// ✅ Game end logic
function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame" style="cursor: pointer; color: #6a1b9a;">🔄 Start New Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}
