const humanScore = 0;
const computerScore = 0;

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
  
  // console.log(humanChoice,  `CPU ${computerChoice} `);
}

const humanSelection = getHumanChoice();
// console.log(humanSelection);
const computerSelection = getComputerChoice();
// console.log("CPU", computerSelection);
playRound(humanSelection, computerSelection);
