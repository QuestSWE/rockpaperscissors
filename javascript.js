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
let startButton;
let countdown;
const buttons = document.querySelectorAll(".main-btn button");
const theme = document.getElementById("myAudio");

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
  const audio = document.querySelector("#myAudio");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      humanChoice = button.id;
      computerChoice = getComputerChoice();
      getImage(humanChoice, computerChoice);
      playGame(humanChoice, computerChoice);
      buttonDisable();

      audio.pause();
      audio.currentTime = 0;

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
      const audio = new Audio("sound/win.mp3");
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
  const delay = 2000;
  const delayComputer = 2000;
  const btn = document.querySelectorAll(".btn");
  const mainBtn = document.querySelector(".main-btn");
  const score = document.querySelectorAll(".score");
  const choice = document.querySelectorAll(".choice");
  const youWon = document.querySelector(".youWon");
  const youLost = document.querySelector(".youLost");
  const flashingColumn = document.querySelector(".column");
  const playAgain = document.querySelector("#playAgain");

  if (humanScore === 5) {
    // btn.forEach((btn) => (btn.style.display = "none"));
    textTop = document.querySelector(".text-top");
    setTimeout(() => {
      const audio = new Audio("sound/mario.mp3");
      audio.play();
      youWon.style.display = "flex";
      mainBtn.style.display = "none";
      flashingColumn.classList.add("flashing");
      textTop.textContent = `YOU WON THE GAME!`;
      playAgain.style.padding = "20px 20px";
    }, delay);
    // cspell:ignore youwin
    const audio = new Audio("sound/youwin.mp3");
    audio.play();
    setTimeout(() => {
      score.forEach((score) => (score.style.display = "none"));
      choice.forEach((choice) => (choice.style.display = "none"));
    }, 2000);

    setTimeout(() => {
      continueTimer();
    }, 4000);

    return;
  } else if (computerScore === 5) {
    // btn.forEach((btn) => (btn.style.display = "none"));
    textTop = document.querySelector(".text-top");
    setTimeout(() => {
      textTop.textContent = `YOU LOST THE GAME, COMPUTER WINS!`;
      const audio = new Audio("sound/lost.mp3");
      audio.play();
      youLost.style.display = "flex";
      mainBtn.style.display = "none";
      playAgain.style.padding = "20px 20px";
    }, delayComputer);

    setTimeout(() => {
      playerLost();
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
  const audio = new Audio("sound/shuffle.mp3");
  audio.volume = 0.8;
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

  const audio = new Audio("sound/losepoint.mp3");
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

document.addEventListener("DOMContentLoaded", () => {
  initializeGame();
  getHumanChoice();
});

function initializeGame() {
  startButton = document.querySelector("#start");
  const rps = document.querySelector(".rps");
  const textTop = document.querySelector(".text-top");
  const score = document.querySelectorAll(".score");
  const choice = document.querySelectorAll(".choice");
  const mainBtn = document.querySelector(".main-btn");
  const byQuest = document.querySelector(".by-quest");
  const gridContainer = document.querySelector(".grid-container");
  const playScore = document.querySelector("#playScore");
  const compScore = document.querySelector("#compScore");
  const questEntContainer = document.querySelector(".quest-ent-container");
  const startButtonContainer = document.querySelector(
    ".start-button-container"
  );
  const playAgainContainer = document.querySelector(
    ".playAgain-button-container"
  );

  startButton.addEventListener("click", () => {
    rps.textContent = "";
    textTop.style.display = "flex";
    mainBtn.style.display = "flex";
    questEntContainer.textContent = "";
    gridContainer.style.display = "grid";
    byQuest.style.display = "none";
    playAgainContainer.style.display = "none";
    startButtonContainer.style.display = "none";
    score.forEach((score) => (score.style.display = "flex"));
    choice.forEach((choice) => (choice.style.display = "flex"));
  });
  textTop.textContent = "First to 5 Points Wins";
  playScore.textContent = "0";
  playScore.style.fontSize = "30px";
  playScore.style.marginLeft = "35px";
  compScore.textContent = "0";
  compScore.style.fontSize = "30px";
  compScore.style.marginLeft = "35px";
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
  backToMenu();
}

function backToMenu() {
  setTimeout(() => {
    const byQuest = document.querySelector(".by-quest");
    const gameover = document.querySelector(".game-over");
    const textChrome = document.querySelector(".text-chrome");
    const playButtonContainer = document.querySelector(
      ".play-button-container"
    );

    gameover.textContent = "";
    byQuest.style.display = "flex";
    textChrome.style.display = "flex";
    playButtonContainer.style.display = "flex";
    location.reload();
  }, 5000);
}

function continueTimer() {
  const gridContainer = document.querySelector(".grid-container");
  const audio = new Audio("sound/gameover.mp3");
  const timer = document.querySelector(".timer");
  const youWon = document.querySelector(".youWon");
  const youLost = document.querySelector(".youLost");
  const playAgainContainer = document.querySelector(
    ".playAgain-button-container"
  );
  let text = "Continue?";
  let spacedText = text.split("").join(" ");
  textTop.textContent = spacedText;
  textTop.style.fontSize = "48px";
  let timeRemaining = 11;

  countdown = setInterval(() => {
    timeRemaining--;
    timer.textContent = timeRemaining;
    playAgainContainer.style.display = "flex";

    if (timeRemaining <= 0) {
      clearInterval(countdown);
      gameOver();
      audio.volume = 0.1;
      audio.play();
      gridContainer.removeChild(textTop);
      youWon.style.display = "none";
      youLost.style.display = "none";
      playAgainContainer.style.display = "none";
      timer.textContent = "";
    }
  }, 1000);
}
function restart() {
  const timer = document.querySelector(".timer");
  const youWon = document.querySelector(".youWon");
  const btn = document.querySelectorAll(".btn");
  const youLost = document.querySelector(".youLost");
  const mainBtn = document.querySelector(".main-btn");
  const playAgain = document.querySelector("#playAgain");
  const flashingColumn = document.querySelector(".column");

  if (playAgain) {
    playAgain.addEventListener("click", () => {
      flashingColumn.classList.remove("flashing");
      flashingColumn.style.backgroundColor = "#050505";
      timer.textContent = "";
      youWon.style.display = "none";
      youLost.style.display = "none";
      mainBtn.style.display = "flex";
      btn.forEach((btn) => (btn.style.display = "block"));
      clearInterval(countdown);
      resetGame();
    });
  }
}
document.addEventListener("DOMContentLoaded", restart);

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

  if (startButton) {
    startButton.click();
  }
}

function playRps() {
  const rps = document.querySelector(".rps");
  const play = document.querySelector("#play");
  const audio = document.querySelector("#myAudio");
  const textChrome = document.querySelector(".text-chrome");
  const textElement = document.getElementById("rainbowText");
  console.log(textElement.textContent);
  const text = textElement.textContent;
  const questEntContainer = document.querySelector(".quest-ent-container");
  const playButtonContainer = document.querySelector(".play-button-container");
  const startButtonContainer = document.querySelector(
    ".start-button-container"
  );

  play.addEventListener("click", () => {
    let textRps = text;
    let textArr = textRps.split("");
    const questEntAudio = new Audio("sound/questent.mp3");
    questEntContainer.classList.add("animate");
    textChrome.style.display = "none";
    playButtonContainer.style.display = "none";
    rps.style.display = "flex";
    rps.textContent = "";

    questEntAudio.volume = 0.4;
    questEntAudio.play();
    setTimeout(() => {
      startButtonContainer.classList.add("fade-in");
      startButtonContainer.style.display = "flex";
    }, 8000);

    setTimeout(() => {
      audio.volume = 0.4;
      audio.play();

      console.log(textArr);
      for (let i = 0; i < textArr.length; i++) {
        setTimeout(() => {
          const span = document.createElement("span");
          span.textContent = textArr[i];
          span.className = "rainbow-letter";
          rps.appendChild(span);
        }, i * 200);
      }
    }, 4000);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("background-video");

  video.addEventListener("timeupdate", () => {
    const endThreshold = 6; // seconds before the end to restart the video
    if (video.duration - video.currentTime <= endThreshold) {
      video.currentTime = 0; // Restart video from the beginning
      video.play();
    }
  });
});

playRps();
