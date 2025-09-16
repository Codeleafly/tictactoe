/* js/main.js */

// Global settings object
window.gameSettings = loadSettings();

document.addEventListener('DOMContentLoaded', () => {
    // Hide preloader once everything is loaded
    hidePreloader();

    // Setup Dark Mode Toggle
    setupDarkModeToggle();

    // Initialize Settings Modal
    initSettingsModal(window.gameSettings);

    // Event Listeners for Game Controls
    document.getElementById('resetBtn').addEventListener('click', () => {
        resetGame(); // This will reset scores and re-initialize
        playSound('assets/sounds/reset.mp3'); // Assuming a reset sound exists
    });

    document.getElementById('newGameBtn').addEventListener('click', () => {
        initializeGame(); // This will start a new round, keeping scores
        playSound('assets/sounds/new_game.mp3'); // Assuming a new game sound exists
    });

    document.getElementById('saveSettingsBtn').addEventListener('click', () => {
        const newSettings = getModalSettings();
        window.gameSettings = { ...window.gameSettings, ...newSettings };
        saveSettings(window.gameSettings);
        // Re-initialize game with new settings if game mode or AI difficulty changed
        initializeGame();
        // Close modal
        const settingsModal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
        if (settingsModal) settingsModal.hide();
    });

    // Initial game setup
    initializeGame();
});
