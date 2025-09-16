/* js/game.js */

let board;
let currentPlayer;
let gameActive;
let scores = { X: 0, O: 0 }; // Initialize scores here
let gameMode; // PvP or PvE
let aiDifficulty; // easy, medium, hard

const WINNING_COMBINATIONS = [
    [0, 1, 2, 'row', 0], [3, 4, 5, 'row', 1], [6, 7, 8, 'row', 2], // Rows
    [0, 3, 6, 'col', 0], [1, 4, 7, 'col', 1], [2, 5, 8, 'col', 2], // Columns
    [0, 4, 8, 'diag', 0], [2, 4, 6, 'diag', 1]                     // Diagonals
];

/**
 * Initializes a new game round.
 */
function initializeGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    gameMode = window.gameSettings.gameMode;
    aiDifficulty = window.gameSettings.aiDifficulty;

    clearBoardUI();
    renderBoard(board, handleCellClick);
    updateStatus(`Player ${currentPlayer}'s Turn`, currentPlayer === 'X' ? 'text-red-500' : 'text-blue-500');
    updateScores(scores); // Ensure scores are updated on UI after initialization
}

/**
 * Handles a cell click event.
 * @param {number} index - The index of the clicked cell.
 */
function handleCellClick(index) {
    if (!gameActive || board[index] !== '') return;

    makeMove(index);

    if (gameActive && gameMode === 'PvE' && currentPlayer === 'O') {
        setTimeout(aiMove, 800); // AI moves after a short delay
    }
}

/**
 * Makes a move on the board.
 * @param {number} index - The index where the move is made.
 */
function makeMove(index) {
    board[index] = currentPlayer;
    const cellElement = gameBoardElement.children[index];
    animateCellClick(cellElement, currentPlayer.toLowerCase());

    if (checkWin()) {
        gameActive = false;
        const [combo, type, idx] = getWinCombo();
        highlightWinningCells(combo, type, idx);
        updateStatus(`Player ${currentPlayer} Wins!`, currentPlayer === 'X' ? 'text-red-500' : 'text-blue-500');
        scores[currentPlayer]++;
        updateScores(scores);
    } else if (checkDraw()) {
        gameActive = false;
        updateStatus("It's a Draw!", 'text-orange-500');
        animateDraw();
    } else {
        switchPlayer();
        updateStatus(`Player ${currentPlayer}'s Turn`, currentPlayer === 'X' ? 'text-red-500' : 'text-blue-500');
    }
}

/**
 * Switches the current player.
 */
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

/**
 * Checks if there's a win condition.
 * @returns {boolean} True if there's a win, false otherwise.
 */
function checkWin() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            return true;
        }
    }
    return false;
}

/**
 * Returns the winning combination details.
 * @returns {Array} [combo, type, index] of the winning combination.
 */
function getWinCombo() {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c, type, index] = WINNING_COMBINATIONS[i];
        if (board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer) {
            return [[a, b, c], type, index];
        }
    }
    return null;
}

/**
 * Checks if the game is a draw.
 * @returns {boolean} True if it's a draw, false otherwise.
 */
function checkDraw() {
    return board.every(cell => cell !== '');
}

/**
 * Resets the game completely, including scores.
 */
function resetGame() {
    scores = { X: 0, O: 0 };
    updateScores(scores);
    initializeGame();
}

/**
 * AI makes a move based on difficulty.
 */
function aiMove() {
    let move;
    if (aiDifficulty === 'easy') {
        move = getEasyAIMove();
    } else if (aiDifficulty === 'medium') {
        move = getMediumAIMove();
    } else if (aiDifficulty === 'hard') {
        move = getHardAIMove(); // Minimax algorithm
    }

    if (move !== undefined) {
        handleCellClick(move);
    }
}

/**
 * Easy AI: Picks a random available cell.
 * @returns {number} The index of the chosen cell.
 */
function getEasyAIMove() {
    const availableCells = board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
    return availableCells[getRandomInt(0, availableCells.length - 1)];
}

/**
 * Medium AI: Prioritizes winning, then blocking, then random.
 * @returns {number} The index of the chosen cell.
 */
function getMediumAIMove() {
    // 1. Check if AI can win
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            let tempBoard = [...board];
            tempBoard[i] = 'O';
            if (checkWinForPlayer(tempBoard, 'O')) return i;
        }
    }

    // 2. Check if Player X can win and block them
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            let tempBoard = [...board];
            tempBoard[i] = 'X';
            if (checkWinForPlayer(tempBoard, 'X')) return i;
        }
    }

    // 3. Take center if available
    if (board[4] === '') return 4;

    // 4. Take a corner if available
    const corners = [0, 2, 6, 8];
    for (let corner of corners) {
        if (board[corner] === '') return corner;
    }

    // 5. Take any available side
    return getEasyAIMove();
}

/**
 * Checks for a win condition for a specific player on a given board.
 * @param {Array<string>} currentBoard - The board state to check.
 * @param {string} player - The player to check for win ('X' or 'O').
 * @returns {boolean} True if the player wins, false otherwise.
 */
function checkWinForPlayer(currentBoard, player) {
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (currentBoard[a] === player && currentBoard[b] === player && currentBoard[c] === player) {
            return true;
        }
    }
    return false;
}

/**
 * Hard AI: Uses the Minimax algorithm to find the best move.
 * @returns {number} The index of the chosen cell.
 */
function getHardAIMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = ''; // Undo move
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

const scoresMap = {
    X: -10, // X (player) wins, bad for AI
    O: 10,  // O (AI) wins, good for AI
    tie: 0
};

/**
 * Minimax algorithm for optimal AI play.
 * @param {Array<string>} currentBoard - The current state of the board.
 * @param {number} depth - The current depth of the recursion.
 * @param {boolean} isMaximizing - True if it's the maximizing player's turn (AI), false otherwise.
 * @returns {number} The score of the best possible move.
 */
function minimax(currentBoard, depth, isMaximizing) {
    let result = checkTerminalState(currentBoard);
    if (result !== null) {
        return scoresMap[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === '') {
                currentBoard[i] = 'O';
                let score = minimax(currentBoard, depth + 1, false);
                currentBoard[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i] === '') {
                currentBoard[i] = 'X';
                let score = minimax(currentBoard, depth + 1, true);
                currentBoard[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

/**
 * Checks if the current board state is a win, loss, or draw.
 * @param {Array<string>} currentBoard - The board state to check.
 * @returns {string|null} 'X', 'O', 'tie', or null if game is not over.
 */
function checkTerminalState(currentBoard) {
    // Check for win
    for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
        const [a, b, c] = WINNING_COMBINATIONS[i];
        if (currentBoard[a] !== '' && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
            return currentBoard[a]; // Return 'X' or 'O'
        }
    }

    // Check for draw
    if (currentBoard.every(cell => cell !== '')) {
        return 'tie';
    }

    return null; // Game not over
}
