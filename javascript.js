let roundValue = [];
// Initialize scores and start the game
let humanScore = 0;
let computerScore = 0;
let currentRound = 0;
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
  let choices = prompt("Rock, Paper or Scissors?");
  if (choices === null) {
    return null;
  }

  let choice = choices.toLowerCase();
  if (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
    alert("Invalid input, please choose between rock, paper or scissors");
    return getHumanChoice();
  } else {
    return choice;
  }
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

// Main function to play the game
// Handles the overall game flow, including rounds and score tracking
function playGame() {
  currentRound = 0;
  console.clear();
  const maxRound = 5;

  while (currentRound < maxRound) {
    const humanSelection = getHumanChoice();

    if (humanSelection === null) {
      console.log(`Game canceled by user.`);
      alert(`Game canceled by the user.`);
      break;
    }
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
    currentRound++;
    roundValue.push(currentRound);
    if (currentRound < 6) {
      // Logs the current scores
      console.log(
        `Human Score is Now ---> %c${humanScore}%c |*| Computer Score is Now ---> %c${computerScore}`,
        "color: orange; font-weight: bold;",
        "",
        "color: orange; font-weight: bold;"
      );
      console.log(
        `This is the current round ---> %c${currentRound}`,
        "color: green; font-weight: bold;"
      );
    }
  }

  // Determines the final result of the game
  if (humanScore > computerScore && currentRound === 5) {
    console.log(`YOU WON THE GAME! YOU DESTROYED THE COMPUTER! WEAK!`);
    alert(`YOU WON THE GAME! YOU DESTROYED THE COMPUTER! WEAK!`);
  } else if (humanScore < computerScore && currentRound === 5) {
    console.log(`YOU LOST THE GAME! THE COMPUTER DESTROYED YOU! CRINGE!`);
    alert(`YOU LOST THE GAME! THE COMPUTER DESTROYED YOU! CRINGE!`);
  } else if (humanScore === computerScore && currentRound === 5) {
    alert(`THE GAME IS A TIE!`);
    console.log(`THE GAME IS A TIE!`);
  }
  playAgain();
}

function playAgain() {
  const play = confirm(`Do you want to play again?`);

  if (play === true) {
    humanScore = 0;
    computerScore = 0;
    playGame();
  } else return;
}

playGame();
