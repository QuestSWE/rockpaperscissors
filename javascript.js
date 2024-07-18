// Initialize scores and start the game
let humanScore = 0;
let computerScore = 0;
let computerChoice;
let humanChoice;
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
      console.log("human choice", humanChoice);

      computerChoice = getComputerChoice();
      console.log("computer choice", computerChoice);
      playGame(humanChoice, computerChoice);
    });
  });
}

// Function to play a single round
// Takes human and computer choices as parameters
function playGame(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    console.log(`IT'S A TIE! YOU BOTH CHOSE ${humanChoice.toUpperCase()}!`);
    console.log("human score", humanScore, "computer score", computerScore);
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    console.log(
      `YOU WON! ${humanChoice.toUpperCase()} BEATS ${computerChoice.toUpperCase()}!`
    );
    console.log("human score", humanScore);
  } else {
    console.log(
      `YOU LOSE! ${computerChoice.toUpperCase()} BEATS ${humanChoice.toUpperCase()}!`
    );
    computerScore++;
    console.log("computer score", computerScore);
  }

  if (humanScore === 5) {
    console.log(`YOU WON THE GAME!`);
    buttonDisable();
    return;
  } else if (computerScore === 5) {
    console.log(`YOU LOST THE GAME, COMPUTER WINS!`);
    buttonDisable();
    return;
  }
}

function buttonDisable() {
  buttons.forEach((button) => {
    button.disabled = true;
  });
}
// Main function to play the game
function play() {
  getHumanChoice();
}
play();

// function playAgain() {
//   const play = confirm(`Do you want to play again?`);

//   if (play === true) {
//     humanScore = 0;
//     computerScore = 0;
//     playGame();
//   } else return;
// }

// playAgain();
