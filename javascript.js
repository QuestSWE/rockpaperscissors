let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  // Generates a number between 1 and 3
  let result = Math.floor(Math.random() * 3) + 1;
  // console.log(result);
  if (result === 1) {
    return "rock";
  } else if (result === 2) {
    return "paper";
  } else return "scissors";
}

function getHumanChoice() {
  let choices = prompt("Rock, Paper or Scissors?");
  let choice = choices.toLowerCase();
  if (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
    alert("Invalid input, please choose between rock, paper or scissors");
  } else return choice;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === "rock" && computerChoice === "paper") {
    computerScore++;
    console.log("You Lose! Paper beats rock!");
    console.log(
      `Human Score is Now ---> ${humanScore} |*| Computer Score is Now ---> ${computerScore}`
    );
  } else if (humanChoice === "rock" && computerChoice === "scissors") {
    humanScore++;
    console.log("You Won! Rock beats Scissors!");
    console.log(
      `Human Score is Now ---> ${humanScore} |*| Computer Score is Now ---> ${computerScore}`
    );
  } else if (humanChoice === "rock" && computerChoice === "rock") {
    console.log("It's a Draw!");
    console.log(
      `Human Score is Still ---> ${humanScore} |*| Computer Score is Still ---> ${computerScore}`
    );
  } else if (humanChoice === "paper" && computerChoice === "rock") {
    humanScore++;
    console.log("You Won! Paper beats Rock!");
    console.log(
      `Human Score is Now ---> ${humanScore} |*| Computer Score is Now ---> ${computerScore}`
    );
  } else if (humanChoice === "paper" && computerChoice === "scissors") {
    computerScore++;
    console.log("You Lose! Scissors beats Paper!");
    console.log(
      `Human Score is Now ---> ${humanScore} |*| Computer Score is Now ---> ${computerScore}`
    );
  } else if (humanChoice === "paper" && computerChoice === "paper") {
    console.log("It's a Draw!");
    console.log(
      `Human Score is Still ---> ${humanScore} |*| Computer Score is Still ---> ${computerScore}`
    );
  } else if (humanChoice === "scissors" && computerChoice === "rock") {
    computerScore++;
    console.log("You Lose! Rock beats Scissors");
    console.log(
      `Human Score is Now ---> ${humanScore} |*| Computer Score is Now ---> ${computerScore}`
    );
  } else if (humanChoice === "scissors" && computerChoice === "paper") {
    humanScore++;
    console.log("You Won! Scissors beats Paper");
    console.log(
      `Human Score is Now ---> ${humanScore} |*| Computer Score is Now ---> ${computerScore}`
    );
  } else if (humanChoice === "scissors" && computerChoice === "scissors") {
    console.log("It's a Draw!");
    console.log(
      `Human Score is Still ---> ${humanScore} |*| Computer Score is Still ---> ${computerScore}`
    );
  }

  console.log(
    `User Choice: ${humanChoice},  Computer Choice: ${computerChoice}`
  );
}
humanScore = 0;
computerScore = 0;

const humanSelection = getHumanChoice();
// console.log(humanSelection);
const computerSelection = getComputerChoice();
// console.log("CPU", computerSelection);
playRound(humanSelection, computerSelection);
