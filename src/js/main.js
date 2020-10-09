console.clear();

/**
 * Init modules
 */
// Set verbosity of Logger to be (ALL, ERR, WARN, DEBUG), checkout the console output
Logger.setVerbossityLevel(Logger.enum.verbosity.ALL);
// Init the DiceGame (mandatory)
DiceGame.init({ logger: Logger, maxPlayerNumber: 2, winningScore: 20 });

let currentTurnRoll = new Array(DiceGame.maxPlayerNumber).fill(0);

function handleRollBtnClick(e) {
  let currentPlayer = DiceGame.getPlayerNumberTurn();
  // Roll and save the roll
  currentTurnRoll[currentPlayer] = DiceGame.roll();

  // Render to HTML
  if (DiceGame.isRunningGame()) {
    playerDiceElems[currentPlayer - 1].textContent =
      currentTurnRoll[currentPlayer];
  } else {
    // Do not render anything
  }

  playerScoreBoardElems[currentPlayer - 1].textContent =
    DiceGame.playerScore[currentPlayer - 1];

  // Goto next player
  DiceGame.nextPlayer();
  currentPlayer = DiceGame.getPlayerNumberTurn();

  // Render Next Player message
  if (DiceGame.isRunningGame())
    messageElem.textContent = `Player #${currentPlayer} turn!`;
  else messageElem.textContent = `Player #${DiceGame.winner} has won!`;
}

function handleResetBtnClick(e) {
  DiceGame.reset();
  // Render all elements to new game status
  messageElem.textContent = "Player #1 turn!";
  playerScoreBoardElems.forEach((ele) => (ele.textContent = "0"));
  playerDiceElems.forEach((ele) => (ele.textContent = "-"));
}

/**
 * DOM
 */
const playerDiceElems = [
  document.getElementById("player1Dice"),
  document.getElementById("player2Dice")
];

const playerScoreBoardElems = [
  document.getElementById("player1ScoreBoard"),
  document.getElementById("player2ScoreBoard")
];
const messageElem = document.getElementById("message");
const rollBtnElem = document.getElementById("rollBtn");
const resetBtnElem = document.getElementById("resetBtn");

/**
 * Register Events
 */
rollBtnElem.addEventListener("click", handleRollBtnClick);
resetBtnElem.addEventListener("click", handleResetBtnClick);
