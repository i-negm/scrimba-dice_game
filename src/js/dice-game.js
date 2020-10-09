"use strict";
/**
 * Dice Game Logic
 */

/**
 * \brief
 *  Must be called before using the DiceGame other methods
 * \params
 *  [in] (optional) logger: Logger object used for debugging, default = null (not used)
 *  [in] (optional) maxPlayerNumber: number of players to play, default = 2
 *  [in] (optional) winningScore: set the threshold when we can declare a winner, default = 20
 */
function DiceGame_init({ logger, maxPlayerNumber, winningScore }) {
  this.logger = logger;
  this.maxPlayerNumber = maxPlayerNumber;
  this.winningScore = winningScore;
  this.playerScore = new Array(this.maxPlayerNumber).fill(0);

  // Print the initialization configuration
  if (this.logger)
    this.logger.debug(
      `Initialized DiceGame with following configuration: ${JSON.stringify(
        arguments[0]
      )}`
    );
}

/**
 * \brief
 *  This function is used for rolling dice (using random number between [1..6])
 * \returns
 *  Random number from rolling the dice
 */
function DiceGame_roll() {
  let randomNumber = Math.ceil(6 * Math.random());

  if (this.winner === 0) {
    // No winner till now, continue the game
    if (this.logger)
      this.logger.debug(
        `Player#${this.playerTurnNumber} has rolled ${randomNumber}`
      );

    // Increase the score
    let currentPlayer = this.playerTurnNumber;
    this.playerScore[currentPlayer - 1] += randomNumber;
    let currentPlayerScore = this.playerScore[currentPlayer - 1];

    if (currentPlayerScore >= this.winningScore) {
      // Declare a winner
      this.winner = currentPlayer;
      if (this.logger) this.logger.debug(`Player#${currentPlayer} has won!`);
    } else {
      if (this.logger)
        this.logger.debug(
          `Player#${currentPlayer} score = ${
            this.playerScore[currentPlayer - 1]
          }`
        );
    }
  } else {
    // There is a winner, wait for resetting the game
    // Do nothing
    if (this.logger)
      this.logger.debug(`Player#${this.winner} has already won!`);
  }

  return randomNumber;
}

/**
 * \brief
 *  This function is used to get the current player number
 */
function DiceGame_getPlayerNumberTurn() {
  if (this.logger)
    this.logger.debug(`Current turn : Player#${this.playerTurnNumber}`);
  return this.playerTurnNumber;
}

/**
 * \brief
 *  This function is used to switch to the next player turn
 * \note
 *  If the game is already won, then this means that this function will do nothing
 */
function DiceGame_nextPlayer() {
  if (this.winner === 0) {
    if (this.playerTurnNumber < this.maxPlayerNumber) {
      this.playerTurnNumber += 1;
    } else {
      this.playerTurnNumber = 1;
    }
    if (this.logger)
      this.logger.debug(`Next turn is for Player#${this.playerTurnNumber}`);
  } else {
    // Game has been won, waiting for a reset
    // Do nothing
  }
}

/**
 * \brief
 *  This function resets the game when it's finished (someone won the game)
 */
function DiceGame_reset() {
  this.winner = 0;
  this.playerScore.fill(0);
  this.playerTurnNumber = 1;

  if (this.logger)
    this.logger.debug(
      `Game has been resetted, new game status = ${JSON.stringify({
        winner: this.winner,
        playerScore: this.playerScore,
        currentPlayer: this.playerTurnNumber
      })}`
    );
}

/**
 * \brief
 *  This function is returning whether the game is still going or not
 * \returns
 *  true : game is still going (no winners till now)
 *  false : game is already finished and someone won
 */
function DiceGame_isRunningGame() {
  return this.winner === 0 ? true : false;
}

/**
 * \brief
 *  Object notation for the DiceGame game
 * \note
 *  1. You have to call init function before using the object
 *  2. You can optionally set some configurations, or just use the default ones
 */
const DiceGame = {
  // Props
  playerScore: null,
  maxPlayerNumber: 2,
  playerTurnNumber: 1,
  winningScore: 20,
  winner: 0,
  logger: null,
  // Methods
  init: DiceGame_init,
  roll: DiceGame_roll,
  getPlayerNumberTurn: DiceGame_getPlayerNumberTurn,
  nextPlayer: DiceGame_nextPlayer,
  reset: DiceGame_reset,
  isRunningGame: DiceGame_isRunningGame
};
