// ██████╗ ██████╗ ███████╗
// ██╔══██╗██╔══██╗██╔════╝
// ██████╔╝██████╔╝███████╗
// ██╔══██╗██╔═══╝ ╚════██║
// ██║  ██║██║     ███████║
// ╚═╝  ╚═╝╚═╝     ╚══════╝

// Initialize scores and start the game
let humanScore = 0;
let computerScore = 0;
let computerChoice;
let humanChoice;
let textTop;
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
  const delay = 2000;
  const delayComputer = 1000;
  if (humanScore === 5) {
    textTop = document.querySelector(".text-top");
    buttonDisable();
    setTimeout(() => {
      const audio = new Audio("sound/mario.mp3");
      audio.play();
      textTop.textContent = `YOU WON THE GAME!`;
    }, delay);
    const audio = new Audio("sound/youwin.mp3");
    audio.play();
    return;
  } else if (computerScore === 5) {
    textTop = document.querySelector(".text-top");
    buttonDisable();
    setTimeout(() => {
      textTop.textContent = `YOU LOST THE GAME, COMPUTER WINS!`;
      const audio = new Audio("sound/gameover.mp3");
      audio.play();
    }, delayComputer);
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
  audio.play();
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
  const playerScore = document.querySelector("#playScore");
  playerScore.textContent = `${humanScore}`;
  playerScore.style.fontSize = "30px";
  playerScore.style.marginLeft = "35px";

  const cpuScore = document.querySelector("#compScore");
  cpuScore.textContent = `${computerScore}`;
  cpuScore.style.fontSize = "30px";
  cpuScore.style.marginLeft = "35px";
}

function shakeDiv() {
  const div = document.querySelector("#shakableDiv");
  div.classList.add("shake");

  const audio = new Audio("sound/oof.mp3");
  audio.play();

  setTimeout(() => {
    div.classList.remove("shake");
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

function init() {
  const gridContainer = document.querySelector('.grid-container');
  if (gridContainer) {
    gridContainer.remove();
  }
}

function play() {
  getHumanChoice();
}

play();
