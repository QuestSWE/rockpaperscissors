let roundValue = [];

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
    playGame();
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
    console.log("Computer Chose Paper. You Lose, Paper Beats Rock!");
  } else if (humanChoice === "rock" && computerChoice === "scissors") {
    humanScore++;
    console.log("You Won! Rock beats Scissors!");
  } else if (humanChoice === "rock" && computerChoice === "rock") {
    console.log("It's a Tie!");
  } else if (humanChoice === "paper" && computerChoice === "rock") {
    humanScore++;
    console.log("You Won! Paper beats Rock!");
  } else if (humanChoice === "paper" && computerChoice === "scissors") {
    computerScore++;
    console.log("You Lose! Scissors beats Paper!");
  } else if (humanChoice === "paper" && computerChoice === "paper") {
    console.log("It's a Tie!");
  } else if (humanChoice === "scissors" && computerChoice === "rock") {
    computerScore++;
    console.log("You Lose! Rock beats Scissors");
  } else if (humanChoice === "scissors" && computerChoice === "paper") {
    humanScore++;
    console.log("You Won! Scissors beats Paper");
  } else if (humanChoice === "scissors" && computerChoice === "scissors") {
    console.log("It's a Tie!");
  }

  // Logs the current scores
  console.log(
    `Human Score is Now ---> %c${humanScore}%c |*| Computer Score is Now ---> %c${computerScore}`,
    "color: orange; font-weight: bold;",
    "",
    "color: orange; font-weight: bold;"
  );
}

// Main function to play the game
// Handles the overall game flow, including rounds and score tracking
function playGame() {
  let currentRound = 0;
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
    currentRound = roundValue.length;
    if (currentRound < 6) {
      console.log(
        `This is the current round ---> %c${currentRound}`,
        "color: green; font-weight: bold;"
      );
    }
  }

  // Determines the final result of the game
  if (humanScore > computerScore && currentRound === 5) {
    console.log(`YOU WON! YOU DESTROYED THE COMPUTER! WEAK!`);
    alert(`YOU WON! YOU DESTROYED THE COMPUTER! WEAK!`);
  } else if (humanScore < computerScore && currentRound === 5) {
    console.log(`YOU LOST! THE COMPUTER DESTROYED YOU! CRINGE!`);
    alert(`YOU LOST! THE COMPUTER DESTROYED YOU! CRINGE!`);
  } else if (humanScore === computerScore && currentRound === 5) {
    alert(`IT'S A TIE!`);
    console.log(`IT'S A TIE!`);
  }
}

// Initialize scores and start the game
let humanScore = 0;
let computerScore = 0;
playGame();
