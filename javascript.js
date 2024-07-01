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
  // console.log(validChoice);

  while (!validChoice) {
    let choices = prompt("Rock, Paper or Scissors?");

    if (choices.toLowerCase() === "rock") {
      console.log("Rock");
      validChoice = true;
      return alert("You chose Rock!");
    } else if (choices.toLowerCase() === "paper") {
      console.log("Paper");
      validChoice = true;
      return alert("You chose Paper!");
    } else if (choices.toLowerCase() === "scissors") {
      console.log("Scissors");
      validChoice = true;
      return alert("You chose Scissors!");
    } else
      alert("Invalid choice, please choose between Rock, Paper or Scissors");
  }
}

getHumanChoice();
