let roundValue = [];


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
  if (choices === null) {
    return null;
  }

  let choice = choices.toLowerCase();
  if (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
    alert("Invalid input, please choose between rock, paper or scissors");
    playGame();
  } else return choice;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === "rock" && computerChoice === "paper") {
    computerScore++;
    console.log("You Lose! Paper beats rock!");
    console.log(
      `Human Score is Now ---> %c${humanScore}%c |*| Computer Score is Now ---> %c${computerScore}`,
      "color: orange; font-weight: bold;",
      "",
      "color: orange; font-weight: bold;"
    );
  } else if (humanChoice === "rock" && computerChoice === "scissors") {
    humanScore++;
    console.log("You Won! Rock beats Scissors!");
    console.log(
      `Human Score is Now ---> %c${humanScore}%c |*| Computer Score is Now ---> %c${computerScore}`,
      "color: orange; font-weight: bold;",
      "",
      "color: orange; font-weight: bold;"
    );
  } else if (humanChoice === "rock" && computerChoice === "rock") {
    console.log("It's a Tie!");
    console.log(
      `Human Score is Still ---> %c${humanScore}%c |*| Computer Score is Still ---> %c${computerScore}`,
      "color: orange; font-weight: bold;",
      "",
      "color: orange; font-weight: bold;"
    );
  } else if (humanChoice === "paper" && computerChoice === "rock") {
    humanScore++;
    console.log("You Won! Paper beats Rock!");
    console.log(
      `Human Score is Now ---> %c${humanScore}%c |*| Computer Score is Now ---> %c${computerScore}`,
      "color: orange; font-weight: bold;",
      "",
      "color: orange; font-weight: bold;"
    );
  } else if (humanChoice === "paper" && computerChoice === "scissors") {
    computerScore++;
    console.log("You Lose! Scissors beats Paper!");
    console.log(
      `Human Score is Now ---> %c${humanScore}%c |*| Computer Score is Now ---> %c${computerScore}`,
      "color: orange; font-weight: bold;",
      "",
      "color: orange; font-weight: bold;"
    );
  } else if (humanChoice === "paper" && computerChoice === "paper") {
    console.log("It's a Tie!");
    console.log(
      `Human Score is Still ---> %c${humanScore}%c |*| Computer Score is Still ---> %c${computerScore}`,
      "color: orange; font-weight: bold;",
      "",
      "color: orange; font-weight: bold;"
    );
  } else if (humanChoice === "scissors" && computerChoice === "rock") {
    computerScore++;
    console.log("You Lose! Rock beats Scissors");
    console.log(
      `Human Score is Now ---> %c${humanScore}%c |*| Computer Score is Now ---> %c${computerScore}`,
      "color: orange; font-weight: bold;",
      "",
      "color: orange; font-weight: bold;"
    );
  } else if (humanChoice === "scissors" && computerChoice === "paper") {
    humanScore++;
    console.log("You Won! Scissors beats Paper");
    console.log(
      `Human Score is Now ---> %c${humanScore}%c |*| Computer Score is Now ---> %c${computerScore}`,
      "color: orange; font-weight: bold;",
      "",
      "color: orange; font-weight: bold;"
    );
  } else if (humanChoice === "scissors" && computerChoice === "scissors") {
    console.log("It's a Tie!");
    console.log(
      `Human Score is Still ---> %c${humanScore}%c |*| Computer Score is Still ---> %c${computerScore}`,
      "color: orange; font-weight: bold;",
      "",
      "color: orange; font-weight: bold;"
    );
  }
  console.log(`Computer Choice: ${computerChoice}`);
}

function playGame() {
  // TODO consider this: every time playGame is called, currentRound is reset back to 0
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
    // TODO play around with the line below
    roundValue.push(currentRound);
    currentRound = roundValue.length;
    console.log(
      `This is the current round ---> %c${currentRound}`,
      "color: green; font-weight: bold;"
    );
  }
  // const humanSelection = getHumanChoice();
  
  // if (humanSelection !== "rock" && humanSelection !== "paper" && humanSelection !== "scissors") {
  //   currentRound--;
  // }

  if (humanScore > computerScore && currentRound === 5) {
    alert(`YOU WON! YOU DESTROYED THE COMPUTER! WEAK!`);
  } else if (humanScore < computerScore && currentRound === 5) {
    alert(`YOU LOST! THE COMPUTER DESTROYED YOU! CRINGE!`);
  } else if (humanScore === computerScore && currentRound === 5) {
    alert(`IT'S A TIE!`);
  }
}
// // TODO test this function deeper
// function getRoundValue() {
//   console.log(roundValue);
//   return roundValue;
// }

let humanScore = 0;
let computerScore = 0;
// console.log(currentRound);
// const currentRoundValue = getRoundValue();
// console.log(`THIS IS THE ROUND VALUE ${currentRoundValue[0]}`);
// console.log('Round values:', roundValue);
// getRoundValue();
playGame();