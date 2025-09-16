/* js/ui.js */

const gameBoardElement = document.getElementById('gameBoard');
const gameStatusElement = document.getElementById('gameStatus');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');

/**
 * Renders the Tic-Tac-Toe board based on the current game state.
 * @param {Array<string>} board - The current state of the board.
 * @param {function} handleCellClick - Callback function for cell clicks.
 */
function renderBoard(board, handleCellClick) {
    gameBoardElement.innerHTML = ''; // Clear existing board
    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell', 'flex', 'items-center', 'justify-center', 'text-5xl', 'font-bold', 'cursor-pointer', 'rounded-lg', 'shadow-neon-sm', 'hover:bg-gray-700', 'hover:text-purple-400', 'transition-all', 'duration-200');
        cellElement.dataset.index = index;
        if (cell === 'X') {
            cellElement.classList.add('x');
            cellElement.innerHTML = '<i class="fas fa-times"></i>';
        } else if (cell === 'O') {
            cellElement.classList.add('o');
            cellElement.innerHTML = '<i class="far fa-circle"></i>';
        }
        cellElement.addEventListener('click', () => handleCellClick(index));
        gameBoardElement.appendChild(cellElement);
    });
    animateBoardReset(gameBoardElement); // Animate cells appearing
}

/**
 * Updates the game status message.
 * @param {string} message - The message to display.
 * @param {string} colorClass - Tailwind CSS color class (e.g., 'text-green-500').
 */
function updateStatus(message, colorClass = '') {
    gameStatusElement.textContent = message;
    gameStatusElement.className = 'text-center text-3xl font-bold mt-8 mb-6 text-yellow-400 drop-shadow-neon-sm animate-pulse-fast font-press-start'; // Reset classes for neon theme
    if (colorClass) {
        gameStatusElement.classList.add(colorClass);
    }
    gsap.fromTo(gameStatusElement, 
        { opacity: 0, y: -10 }, 
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
}

/**
 * Updates the scores displayed on the scoreboard.
 * @param {object} scores - Object containing scores for X and O.
 */
function updateScores(scores) {
    animateScoreUpdate('scoreX', scores.X);
    animateScoreUpdate('scoreO', scores.O);
}

/**
 * Highlights the winning cells and draws the win line.
 * @param {Array<number>} winCombo - Array of indices of the winning cells.
 * @param {string} type - Type of win (row, col, diag).
 * @param {number} index - Index of the row/col/diag.
 */
function highlightWinningCells(winCombo, type, index) {
    animateWinningCellsBlink(gameBoardElement, winCombo);
}

/**
 * Clears the board and status for a new game.
 */
function clearBoardUI() {
    gameBoardElement.innerHTML = '';
    updateStatus('');
    // Stop any blinking animations on cells
    Array.from(gameBoardElement.children).forEach(cell => {
        gsap.killTweensOf(cell); // Stop GSAP animations
        cell.style.backgroundColor = ''; // Reset background color
        resetCellAnimation(cell);
    });
}

/**
 * Sets up the dark mode toggle functionality.
 */
function setupDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    // Apply initial theme based on settings
    if (window.gameSettings.darkMode) {
        htmlElement.classList.add('dark');
    } else {
        htmlElement.classList.remove('dark');
    }

    darkModeToggle.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
        const isDarkMode = htmlElement.classList.contains('dark');
        localStorage.setItem('darkMode', isDarkMode);
        window.gameSettings.darkMode = isDarkMode; // Update global settings
    });
}

/**
 * Initializes the settings modal with current game settings.
 * @param {object} settings - The current game settings.
 */
function initSettingsModal(settings) {
    document.getElementById('gameMode').value = settings.gameMode;
    document.getElementById('aiDifficulty').value = settings.aiDifficulty;
    document.getElementById('soundEffectsToggle').checked = settings.soundEffects;

    const aiDifficultyContainer = document.getElementById('aiDifficultyContainer');
    if (settings.gameMode === 'PvE') {
        aiDifficultyContainer.style.display = 'block';
    } else {
        aiDifficultyContainer.style.display = 'none';
    }

    document.getElementById('gameMode').addEventListener('change', (event) => {
        if (event.target.value === 'PvE') {
            aiDifficultyContainer.style.display = 'block';
        } else {
            aiDifficultyContainer.style.display = 'none';
        }
    });
}

/**
 * Gets the settings from the modal.
 * @returns {object} The settings from the modal.
 */
function getModalSettings() {
    return {
        gameMode: document.getElementById('gameMode').value,
        aiDifficulty: document.getElementById('aiDifficulty').value,
        soundEffects: document.getElementById('soundEffectsToggle').checked
    };
}
