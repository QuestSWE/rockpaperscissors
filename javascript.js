// GET computerChoice
// GENERATE random number between 1 and 3
// ASSIGN value to result
// IF result is 1 THEN return "rock"
// ELSE IF result is 2 THEN return "paper"
// ELSE return "scissors"
function getComputerChoice() {
  // Generates a number between 1 and 3
  let result = Math.floor(Math.random() * 3) + 1;
  console.log(result);
  if (result === 1) {
    return console.log("Rock");
  } else if (result === 2) {
    return console.log("Paper");
  } else return console.log("Scissors");
}
getComputerChoice();
