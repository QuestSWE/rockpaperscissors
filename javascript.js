// ██████╗ ██████╗ ███████╗
// ██╔══██╗██╔══██╗██╔════╝
// ██████╔╝██████╔╝███████╗
// ██╔══██╗██╔═══╝ ╚════██║
// ██║  ██║██║     ███████║
// ╚═╝  ╚═╝╚═╝     ╚══════╝

// Initialize scores and start the game
let humanScore = 0;
let computerScore = 4;
let computerChoice;
let humanChoice;
let textTop;
let playButton;
const buttons = document.querySelectorAll(".main-btn button");

// Function to get the computer's choice
// Randomly returns "rock", "paper", or "scissors"
function getComputerChoice() {
  let result = Math.floor(Math.random() * 3) + 1;
  if (result === 1) {
    return "rock";
  } else if (result === 2) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Function to get the human's choice
function getHumanChoice() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      humanChoice = button.id;
      computerChoice = getComputerChoice();
      getImage(humanChoice, computerChoice);
      playGame(humanChoice, computerChoice);
      buttonDisable();
      setTimeout(() => {
        buttons.forEach((button) => {
          button.disabled = false;
        });
      }, 3600);
    });
  });
}

// Function to play a single round
// Takes human and computer choices as parameters
function playGame(humanChoice, computerChoice) {
  const delay = 2600;
  textTop = document.querySelector(".text-top");
  if (humanChoice === computerChoice) {
    computerLoading();
    setTimeout(() => {
      const audio = new Audio("sound/tie.mp3");
      audio.play();
      textTop.textContent = `IT'S A TIE! YOU BOTH CHOSE ${humanChoice.toUpperCase()}!`;
    }, delay);
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    computerLoading();
    setTimeout(() => {
      humanScore++;
      const audio = new Audio("sound/score.mp3");
      audio.volume = 0.5;
      audio.play();
      textTop.textContent = `YOU WON! ${humanChoice.toUpperCase()} BEATS ${computerChoice.toUpperCase()}!`;
      scoreTracking();
      winnerAnnouncement();
    }, delay);
  } else {
    computerLoading();
    setTimeout(() => {
      computerScore++;
      textTop.textContent = `YOU LOSE! ${computerChoice.toUpperCase()} BEATS ${humanChoice.toUpperCase()}!`;
      shakeDiv();
      scoreTracking();
      winnerAnnouncement();
    }, delay);
  }
}

function winnerAnnouncement() {
  const score = document.querySelectorAll(".score");
  const mainBtn = document.querySelector(".main-btn");
  const choice = document.querySelectorAll(".choice");
  const playAgainContainer = document.querySelector(
    ".playAgain-button-container"
  );
  const flashingColumn = document.querySelector(".column");
  const delay = 2000;
  const delayComputer = 2000;

  if (humanScore === 5) {
    textTop = document.querySelector(".text-top");
    buttonDisable();
    setTimeout(() => {
      const audio = new Audio("sound/mario.mp3");
      // audio.play();
      flashingColumn.classList.add("flashing");
      textTop.textContent = `YOU WON THE GAME!`;
      playAgainContainer.style.display = "flex";
      playAgain.style.padding = "20px 20px";
    }, delay);
    // cspell:ignore youwin
    const audio = new Audio("sound/youwin.mp3");
    // audio.play();
    setTimeout(() => {
      mainBtn.style.display = "none";
      score.forEach((score) => (score.style.display = "none"));
      choice.forEach((choice) => (choice.style.display = "none"));
    }, 2000);
    return;
  } else if (computerScore === 5) {
    textTop = document.querySelector(".text-top");
    buttonDisable();
    setTimeout(() => {
      textTop.textContent = `YOU LOST THE GAME, COMPUTER WINS!`;
      const audio = new Audio("sound/lost.mp3");
      // audio.play();
      playAgainContainer.style.display = "flex";
      playAgain.style.padding = "20px 20px";
    }, delayComputer);

    setTimeout(() => {
      playerLost();
      mainBtn.style.display = "none";
      score.forEach((score) => (score.style.display = "none"));
      choice.forEach((choice) => (choice.style.display = "none"));
    }, 2000);

    setTimeout(() => {
      continueTimer();
    }, 4000);
    return;
  }
}

function buttonDisable() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

/**
 * Updates the specified container with an image based on the given choice.
 * Rotates the image 180 degrees if the computer chose scissors.
 *
 * @param {string} choice - The choice to display (e.g., "rock", "paper", "scissors").
 * @param {string} selector - The CSS selector of the container to update.
 */
function updateChoiceImage(choice, selector) {
  const imgElement = document.createElement("img");
  imgElement.src = `img/${choice}.png?t=${new Date().getTime()}`;
  imgElement.alt = `pixelated ${choice} image`;
  imgElement.width = "280";

  const container = document.querySelector(selector);
  container.innerHTML = "";
  container.appendChild(imgElement);

  if (computerChoice === "scissors" && selector === ".computer-choice") {
    imgElement.style.transform = "rotate(180deg)";
  }
}

function getImage(humanChoice, computerChoice) {
  const audio = new Audio("sound/jackpot.mp3");
  audio.volume = 0.4;
  // audio.play();
  const delay = 2200;
  if (
    humanChoice === "rock" ||
    humanChoice === "paper" ||
    humanChoice === "scissors"
  ) {
    updateChoiceImage(humanChoice, ".human-choice");
  }

  if (
    computerChoice === "rock" ||
    computerChoice === "paper" ||
    computerChoice === "scissors"
  ) {
    shuffleImages(() => {
      updateChoiceImage(computerChoice, ".computer-choice");
    }, delay);
  }
}

function shuffleImages(callback, duration) {
  const images = ["img/rock.png", "img/paper.png", "img/scissors.png"];
  const shuffleInterval = 200;
  const computerImage = document.querySelector(".computer-choice");
  let shuffleCount = 0;
  let currentIndex = 0;

  const shuffle = setInterval(() => {
    computerImage.innerHTML = "";
    const imgElement = document.createElement("img");
    imgElement.src = `${images[currentIndex]}?t=${new Date().getTime()}`;
    imgElement.width = 280;
    computerImage.appendChild(imgElement);

    if (currentIndex === 2) {
      imgElement.style.transform = "rotate(180deg)";
    }

    currentIndex = (currentIndex + 1) % images.length;
    shuffleCount += shuffleInterval;

    if (shuffleCount >= duration) {
      clearInterval(shuffle);
      callback();
    }
  }, shuffleInterval);
}

function scoreTracking() {
  const playScore = document.querySelector("#playScore");
  playScore.textContent = `${humanScore}`;
  playScore.style.fontSize = "30px";
  playScore.style.marginLeft = "35px";

  const compScore = document.querySelector("#compScore");
  compScore.textContent = `${computerScore}`;
  compScore.style.fontSize = "30px";
  compScore.style.marginLeft = "35px";
}

function shakeDiv() {
  const shakableDiv = document.querySelector("#shakableDiv");
  shakableDiv.classList.add("shake");

  const audio = new Audio("sound/oof.mp3");
  audio.volume = 0.5;
  audio.play();

  setTimeout(() => {
    shakableDiv.classList.remove("shake");
  }, 500);
}

function computerLoading() {
  let waitingComputer = [
    "Waiting for Computer",
    "Waiting for Computer.",
    "Waiting for Computer..",
    "Waiting for Computer...",
  ];
  const shuffleInterval = 300;
  const textTop = document.querySelector(".text-top");
  let shuffleCount = 0;
  let shuffleDuration = 2200;
  let currentIndex = 0;

  const cycle = setInterval(() => {
    textTop.innerHTML = "";
    currentIndex = (currentIndex + 1) % waitingComputer.length;
    shuffleCount += shuffleInterval;
    textTop.textContent = waitingComputer[currentIndex];

    if (shuffleCount >= shuffleDuration) {
      clearInterval(cycle);
    }
  }, shuffleInterval);
}

function initializeGame() {
  playButton = document.querySelector("#play");
  const playButtonContainer = document.querySelector(".play-button-container");
  const playAgainContainer = document.querySelector(
    ".playAgain-button-container"
  );
  const textTop = document.querySelector(".text-top");
  const score = document.querySelectorAll(".score");
  const choice = document.querySelectorAll(".choice");
  const mainBtn = document.querySelector(".main-btn");
  const gridContainer = document.querySelector(".grid-container");
  const playScore = document.querySelector("#playScore");
  const compScore = document.querySelector("#compScore");

  playButton.addEventListener("click", () => {
    playButtonContainer.style.display = "none";
    playAgainContainer.style.display = "none";
    textTop.style.display = "flex";
    choice.forEach((choice) => (choice.style.display = "flex"));
    mainBtn.style.display = "flex";
    score.forEach((score) => (score.style.display = "flex"));
    gridContainer.style.display = "grid";
  });
  textTop.textContent = "First to 5 Points Wins";
  playScore.textContent = "0";
  playScore.style.fontSize = "30px";
  playScore.style.marginLeft = "35px";
  compScore.textContent = "0";
  compScore.style.fontSize = "30px";
  compScore.style.marginLeft = "35px";
}

function resetGame() {
  const textTop = document.querySelector(".text-top");
  const playScore = document.querySelector("#playScore");
  const compScore = document.querySelector("#compScore");

  textTop.textContent = "First to 5 Points Wins";
  textTop.removeAttribute("style");
  playScore.textContent = "0";
  compScore.textContent = "0";
  humanScore = 0;
  computerScore = 0;

  if (playButton) {
    playButton.click();
  }
}

function playerLost() {
  const column = document.querySelector(".column");
  column.style.backgroundColor = "black";
}

// cspell:ignore gameover
function gameOver() {
  const gameover = document.querySelector(".game-over");
  let text = "GAME OVER";
  let animatedText = text.split("");
  gameover.textContent = "";

  for (let i = 0; i < animatedText.length; i++) {
    setTimeout(() => {
      gameover.textContent += animatedText[i];
      gameover.style.color = "red";
      gameover.style.fontSize = "150px";
    }, i * 200);
  }
}

function continueTimer() {
  const gridContainer = document.querySelector(".grid-container");
  const audio = new Audio("sound/gameover.mp3");
  const timer = document.querySelector(".timer");
  const playAgainContainer = document.querySelector(
    ".playAgain-button-container"
  );
  let text = "Continue?";
  let spacedText = text.split("").join(" ");
  textTop.textContent = spacedText;
  textTop.style.fontSize = "48px";
  let timeRemaining = 11;

  const countdown = setInterval(() => {
    timeRemaining--;
    timer.textContent = timeRemaining;

    if (timeRemaining <= 0) {
      clearInterval(countdown);
      gameOver();
      audio.volume = 0.1;
      audio.play();
      gridContainer.removeChild(textTop);
      playAgainContainer.style.display = "none";
      timer.textContent = "";
    }
  }, 1000);
}

function play() {
  document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
    getHumanChoice();

    const playAgain = document.querySelector("#playAgain");
    const flashingColumn = document.querySelector(".column");

    playAgain.addEventListener("click", () => {
      flashingColumn.classList.remove("flashing");
      flashingColumn.style.backgroundColor = "#575757";
      resetGame();
    });
  });
}

play();
