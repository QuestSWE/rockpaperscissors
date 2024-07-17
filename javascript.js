let roundValue = [];
// Initialize scores and start the game
let humanScore = 0;
let computerScore = 0;
let currentRound = 0;
let humanChoice = '';
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
// Prompts the user for input and validates it
// If invalid input is provided, the game restarts
// Returns null if the prompt is canceled
function getHumanChoice() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.id === "rock") {
        humanChoice = button.id;
        console.log(humanChoice);
        return humanChoice;
      } else if (button.id === "paper") {
        console.log("paper it is");
      } else console.log("scissors");
    });
  });
}

// Function to play a single round
// Takes human and computer choices as parameters
// Updates scores and logs the outcome to the console
function playRound(humanChoice, computerChoice) {
  if (humanChoice === "rock" && computerChoice === "paper") {
    computerScore++;
    console.log("Computer Chose Paper. You Lose! Paper Beats Rock!");
  } else if (humanChoice === "rock" && computerChoice === "scissors") {
    humanScore++;
    console.log("Computer Chose Scissors. You Won! Rock beats Scissors!");
  } else if (humanChoice === "rock" && computerChoice === "rock") {
    console.log("Computer Also Chose Rock. It's a Tie!");
  } else if (humanChoice === "paper" && computerChoice === "rock") {
    humanScore++;
    console.log("Computer Chose Rock. You Won! Paper beats Rock!");
  } else if (humanChoice === "paper" && computerChoice === "scissors") {
    computerScore++;
    console.log("Computer Chose Scissors. You Lose! Scissors beats Paper!");
  } else if (humanChoice === "paper" && computerChoice === "paper") {
    console.log("Computer Also Chose Paper. It's a Tie!");
  } else if (humanChoice === "scissors" && computerChoice === "rock") {
    computerScore++;
    console.log("Computer Chose Rock. You Lose! Rock beats Scissors");
  } else if (humanChoice === "scissors" && computerChoice === "paper") {
    humanScore++;
    console.log("Computer Chose Paper. You Won! Scissors beats Paper");
  } else if (humanChoice === "scissors" && computerChoice === "scissors") {
    console.log("Computer Also Chose Scissors. It's a Tie!");
  }
}

// const buttons = document.querySelectorAll("button");

// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     if (button.id === 'rock') {
//       console.log('button is rock');
//     } else if (button.id === "paper") {
//       console.log("paper it is");
//     } else console.log("scissors");
//   });
// });

// Main function to play the game
// function playGame() {
//   // playAgain();
// }

// function playAgain() {
//   const play = confirm(`Do you want to play again?`);

//   if (play === true) {
//     humanScore = 0;
//     computerScore = 0;
//     playGame();
//   } else return;
// }

// playGame();
getHumanChoice();
