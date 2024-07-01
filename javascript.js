// GET computerChoice
// GENERATE random number between 1 and 3
// ASSIGN value to result
// IF result is 1 THEN return "rock"
// ELSE IF result is 2 THEN return "paper"
// ELSE return "scissors"

// GET humanChoice
// DISPLAY to user choice between rock paper or scissors
// OBTAIN user string input choice
// IF user inputs is NOT one of the choices
// THEN DISPLAY a message to user that its not a valid input, repeat choices
// RETURN valid string input

// function getComputerChoice() {
//   // Generates a number between 1 and 3
//   let result = Math.floor(Math.random() * 3) + 1;
//   console.log(result);
//   if (result === 1) {
//     return console.log("Rock");
//   } else if (result === 2) {
//     return console.log("Paper");
//   } else return console.log("Scissors");
// }
// getComputerChoice();

function getHumanChoice(string) {
  let validChoice = false;
  console.log(validChoice);

  while (!validChoice) {
    let choices = prompt("Rock, Paper or Scissors?");

    if (choices === "Rock") {
      console.log("Rock");
      validChoice = true;
      alert("You chose Rock!");
      console.log(validChoice);
    } else if (choices === "Paper") {
      console.log("Paper");
      alert("You chose Paper!");
      validChoice = true;
      console.log(validChoice);
    } else if (choices === "Scissors") {
      console.log("Scissors");
      alert("You chose Scissors!");
      validChoice = true;
      console.log(validChoice);
    } else alert("Invalid choice, please choose between Rock, Paper or Scissors");
  }
}

// prompt("Input invalid, please choose between Rock, Paper or Scissors");
getHumanChoice();
