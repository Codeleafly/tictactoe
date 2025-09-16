# Neon Tic-Tac-Toe

## Description
Neon Tic-Tac-Toe is a modern, visually appealing implementation of the classic Tic-Tac-Toe game. It features a sleek neon-themed interface, responsive design, sound effects, and an AI opponent with adjustable difficulty levels, including an unbeatable Minimax algorithm.

## Features
*   **Visually Stunning:** Neon-themed design with smooth animations and transitions.
*   **Responsive Design:** Playable on desktops, tablets, and mobile devices.
*   **Player vs. Player (PvP):** Challenge a friend on the same device.
*   **Player vs. AI (PvE):** Test your skills against an AI opponent.
*   **Adjustable AI Difficulty:**
    *   **Easy:** Random moves.
    *   **Medium:** Prioritizes winning, then blocking, then strategic moves (center, corners).
    *   **Hard (Minimax):** An unbeatable AI using the Minimax algorithm.
*   **Sound Effects:** Engaging audio feedback for game actions (can be toggled).
*   **Dark Mode:** A persistent dark mode for a comfortable gaming experience.
*   **Score Tracking:** Keeps track of scores for both players/AI.
*   **Game Controls:** Easy options to reset the current round or start a completely new game (resetting scores).
*   **Settings Modal:** Configure game mode, AI difficulty, and sound effects.

## Technologies Used
*   **HTML5:** Structure of the game.
*   **CSS3:** Styling, including custom neon themes and responsive design.
*   **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
*   **Bootstrap 5:** Responsive grid system and UI components (modals, buttons).
*   **JavaScript (ES6+):** Game logic, UI manipulation, and interactivity.
*   **GSAP (GreenSock Animation Platform):** High-performance JavaScript animation library for smooth UI effects.
*   **jQuery:** DOM manipulation (used for some Bootstrap components and general utility).
*   **Font Awesome & Boxicons:** Professional icon libraries.
*   **Google Fonts:** Custom fonts (`Orbitron`, `Press Start 2P`) for a retro-futuristic feel.

## How to Play
1.  **Start the Game:** Open `index.html` in your web browser.
2.  **Choose Game Mode:** Click the "Settings" button (gear icon) to open the modal. Select "Player vs Player" or "Player vs AI".
3.  **Set AI Difficulty (if PvE):** If playing against AI, choose "Easy", "Medium", or "Hard".
4.  **Toggle Sound Effects:** Enable or disable sound effects in the settings.
5.  **Make Your Move:** Click on any empty cell on the 3x3 grid to place your mark (X or O).
6.  **Win Condition:** Get three of your marks in a row, column, or diagonal to win the round.
7.  **Draw:** If all cells are filled and no player has won, the round is a draw.
8.  **Reset/New Round:**
    *   **Reset:** Clears scores and starts a completely new game.
    *   **New Round:** Starts a new round, keeping the current scores.
9.  **Dark Mode:** Use the lightbulb icon to toggle dark mode on or off. Your preference will be saved.

## Installation
This is a client-side web application. No special installation is required beyond a web browser.

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd neon-tic-tac-toe
    ```
2.  **Open `index.html`:** Simply open the `index.html` file in your preferred web browser.

## Usage
Just open `index.html` in your browser and start playing! All game controls and settings are accessible directly from the user interface.

## Project Structure
```
S:\tictactoe\
├───index.html
├───assets\
│   └───sounds\
│       ├───click.mp3
│       ├───draw.mp3
│       ├───new_game.mp3
│       ├───reset.mp3
│       └───win.mp3
├───css\
│   ├───animations.css
│   └───style.css
└───js\
    ├───effects.js
    ├───game.js
    ├───main.js
    ├───ui.js
    └───utils.js
```

*   `index.html`: The main HTML file containing the game structure and linking all resources.
*   `assets/sounds/`: Contains audio files for in-game sound effects.
*   `css/animations.css`: Defines keyframe animations for various UI elements.
*   `css/style.css`: Contains the core styling for the game, including neon themes, responsive adjustments, and component-specific styles.
*   `js/effects.js`: Handles visual animations and sound playback using GSAP.
*   `js/game.js`: Implements the core game logic, including board state management, win/draw conditions, AI logic (Easy, Medium, Minimax).
*   `js/main.js`: Initializes the game, sets up event listeners, and manages global settings.
*   `js/ui.js`: Manages all user interface updates, rendering the board, status messages, and scoreboard.
*   `js/utils.js`: Provides utility functions like random number generation, debouncing, and local storage management for settings.
