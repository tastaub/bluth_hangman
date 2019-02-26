let wordBrokenArray;

const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

let game = {
  wins: 0,
  losses: 0,
  guessesLeft: 9,
  lettersGuessed: [],
  wordBank: [
    "bluth",
    "gob",
    "michael",
    "george michael",
    "hot cops",
    "hermano",
    "lucille",
    "buster",
    "tobias",
    "anne",
    "cousins",
    "lindsey",
    "brother",
    "bannana",
    "judge",
    "mrf",
    "seal",
    "steve holt",
    "oscar",
    "uncle father",
    "lucille ii",
    "teamocil",
    "carl weathers",
    "tbd"
  ]
};

// Turn word into array
// Create a loop for array and add true false tags
function breakWord(str) {
  wordBrokenArray = str
    .split("")
    .map(char =>
      char === " " ? { char, isShow: true } : { char, isShow: false }
    );
  return wordBrokenArray;
}

function renderGuessArray(arr) {
  renderScoreBoard();
  const mainBody = document.getElementById("main-container");
  console.log(mainBody);
  mainBody.innerHTML = "";
  let container = document.createElement("div");
  container.classList.add("container");

  arr.forEach(char => {
    let charDivs = document.createElement("div");
    charDivs.classList.add("char-divs");
    if (char.isShow) {
      charDivs.innerHTML = char.char.toUpperCase();
      console.log("Div is set with char!");
    } else {
      charDivs.innerHTML = "*";
      console.log("Div is set with -");
    }
    container.append(charDivs);
  });

  mainBody.append(container);
}

function renderScoreBoard() {
  const scoreBoardContainer = document.getElementById("score-board");
  scoreBoardContainer.innerHTML = "";
  console.log(scoreBoardContainer);
  const grouping = document.createElement("ul");
  let wins = document.createElement("li");
  wins.innerHTML = `Wins: ${game.wins}`;
  let losses = document.createElement("li");
  losses.innerHTML = `Losses: ${game.losses}`;
  let guessesLeft = document.createElement("li");
  guessesLeft.innerHTML = `Guesses Left: ${game.guessesLeft}`;
  grouping.append(wins, losses, guessesLeft);
  scoreBoardContainer.append(grouping);
}

function render() {
  renderScoreBoard();
  renderGuessArray(wordBrokenArray);
  renderAlphabet();
}

function checkGuess(guess) {
  if (game.lettersGuessed.includes(guess)) {
    const gameMessage = document;
  } else {
    let correctArr = wordBrokenArray.map(char => char.char);
    if (correctArr.indexOf(guess) !== -1) {
      for (let i = 0; i < wordBrokenArray.length; i++) {
        if (wordBrokenArray[i].char === guess) {
          console.log(correctArr);
          wordBrokenArray[i].isShow = true;
          checkWin(wordBrokenArray);
          console.log(wordBrokenArray);
        }
      }
      game.lettersGuessed.push(guess.toUpperCase());
    } else {
      console.log(correctArr);
      console.log("wrong");
      game.guessesLeft--;
      checkLoss();

      console.log(game.guessesLeft);
      game.lettersGuessed.push(guess.toUpperCase());
    }
  }
  render();
}

function renderAlphabet() {
  document.getElementById("alphabet-container").innerHTML = "";
  alphabet.forEach(letter => {
    let ltrBoxElem = document.createElement("div");
    ltrBoxElem.classList.add("letter-box");
    if (game.lettersGuessed.includes(letter.toUpperCase())) {
      ltrBoxElem.classList.add("letter-used");
    }
    ltrBoxElem.innerHTML = `<p>${letter}</p>`;
    document.getElementById("alphabet-container").appendChild(ltrBoxElem);
  });
}

function checkLoss() {
  game.guessesLeft === 0 ? giveLoss() : collectGuessedChar();
}

function giveWin() {
  game.wins++;
  resetGame();
}

function giveLoss() {
  game.losses++;
  resetGame();
}

function checkWin(arr) {
  let len = arr.length;
  let checkIsShow = arr.filter(char => char.isShow === true).length;
  len === checkIsShow ? giveWin() : collectGuessedChar();
}

function resetGame() {
  console.log("Resetting game");
  getRandomWord(game.wordBank);
  game.guessesLeft = 9;
  game.lettersGuessed = [];
}

function getRandomWord(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  breakWord(arr[randomIndex]);
  renderGuessArray(wordBrokenArray);
  renderAlphabet();
  collectGuessedChar();
}

getRandomWord(game.wordBank);

function collectGuessedChar() {
  document.onkeyup = e => {
    e.preventDefault();
    let guess = e.key;
    checkGuess(guess);
  };
}
