const humanScore = 0;
const computerScore = 0;

function getComputerChoice(n) {
  // Generates a number between 1 and 3
  let result = Math.floor(Math.random() * 3) + 1;
  console.log(result);
}

function getHumanChoice(string) {
  let choices = prompt("Rock, Paper or Scissors?");

  let humanChoice = {
    rock: 1,
    paper: 2,
    scissors: 3,
  };

  let lowerCaseInput = choices.toLowerCase();

  let humanChoices = humanChoice[lowerCaseInput];
  return console.log(humanChoices);
}

function playRound(getHumanChoice, getComputerChoice) {
  let numToStr = {
    1: "Rock",
    2: "Paper",
    3: "Scissors",
  };
}
getComputerChoice();
getHumanChoice();
// playRound();
