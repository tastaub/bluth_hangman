
var wordBank = ["bluth", "gob", "michael",  "george michael", "hot cops", "hermano", "lucille", "buster", "tobias", "anne", "cousins", "lindsey", "brother", "bannana", "judge", "mrf", "seal", "steve holt", "oscar", "uncle father", "lucille ii", "teamocil", "carl weathers", "tbd"];
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",]
var wins = 0;
var losses = 0;
var guessesLeft = 9;
var guessedLetters = [];
var userGuesses = null;
var wordToBeGuessed = wordBank[Math.floor(Math.random() * wordBank.length)];
var guessArray = [];
var html = "<p><h1>";

// Turn word into array
// Create a loop for array and add true false tags
function breakWord() {
    for (var i = 0, j = 0; i < wordToBeGuessed.length; i++) {
        guessArray[j] = wordToBeGuessed.charAt(i);
        j++
        if (wordToBeGuessed.charAt(i) != " ") {
            guessArray[j] = false;
        } else {
            guessArray[j] = true;
        }
        j++
    }
}

function consoleLogs() {
    console.log("wins: " + wins + "\n" + "losses: " + losses + "\n");
    console.log("guessesLeft: " + guessesLeft + "\n");
    console.log("guessedLetters: " + guessedLetters + "\n");
    console.log("wordToBeGuessed: " + wordToBeGuessed + "\n");
    console.log("guessArray: " + guessArray + "\n");
    console.log("--------------------------------");
}

function resetGame() {
    guessesLeft = 9;
    guessedLetters = [];
    wordToBeGuessed = wordBank[Math.floor(Math.random() * wordBank.length)];
    guessArray = [];
    breakWord();
    var htmlInstructions = "<p><h3>Press any key to begin guessing</p></h3>";
    document.querySelector("#instructions").innerHTML = htmlInstructions;
    var htmlGameInitial = "<p><h1>";
    for (var i = 0; i < wordToBeGuessed.length; i++) {
        if (wordToBeGuessed.charAt(i) == " ") {
            htmlGameInitial += "&nbsp;&nbsp;";
        } else {
            htmlGameInitial += "_&nbsp;";
        }
    }
    htmlGameInitial += "</h1></p>"
    document.querySelector("#game").innerHTML = htmlGameInitial;
    var htmlStats = "<p><h3>" + "Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
    document.querySelector("#stats").innerHTML = htmlStats;
}

//Update on screen game, stats, and guessed letters
function displayProgress() {
    for (i = 0, j = 0; i < (guessArray.length / 2); i++) {
        if (guessArray[j + 1] == true) {
            html += guessArray[j];
        } else {
            html += "_";
        }
        html += "&nbsp;";
        j = j + 2;
    }
    html += "</h1></p>"
    document.querySelector("#game").innerHTML = html;
    htmlStats = "<p><h3>Wins: " + wins + " Losses: " + losses + " Guesses Left : " + guessesLeft + "</h3></p>";
    document.querySelector("#stats").innerHTML = htmlStats;
    htmlGuesses = "<p><h3>"
    for (var i = 0; i < guessedLetters.length; i++) {
        htmlGuesses += guessedLetters[i] + "&nbsp;";
    }
    htmlGuesses += "</h3></p>";
    document.querySelector("#guesses").innerHTML = htmlGuesses;
}

//Check to make sure valid guess
//Change false stament to true
function checkGuess() {
    if (guessArray.indexOf(userGuess) < 0 && guessedLetters.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
        guessesLeft--;
    }
    if (guessedLetters.indexOf(userGuess) < 0 && letters.indexOf(userGuess) >= 0) {
        guessedLetters[guessedLetters.length] = userGuess;
    }
    for (var i = 0; i < guessArray.length; i++) {
        if (guessArray[i] === userGuess) {
            guessArray[i + 1] = true;
        }
    }
}


function checkWin() {
    if (guessArray.indexOf(false) < 0) {
        alert("USER WINS");
        wins++;
        resetGame();
    }
}


function checkLoss() {
    if (guessesLeft == 0) {
        alert("USER LOSES");
        losses++;
        resetGame();
    }
}


function resetHtmlVariable() {
    html = "<p><h1>";
}

// Set up game
breakWord();
resetGame();
consoleLogs();
// Run Event Functions
document.onkeyup = function (event) {
    userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    checkGuess();
    displayProgress();   
    resetHtmlVariable();
    checkWin();
    checkLoss();
    consoleLogs();
}
