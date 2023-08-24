// Gameboard module
const Gameboard = (() => {
    // Declaring board array and filling each index with blank values.
    // This array will be used to store the moves played each turn
    let board = Array(9).fill('');

    const getBoard = () => board; // returns board array when called

    /*
     * The function `updateCell` updates a cell in a board array with a given marker if the cell is empty,
     * and returns true if the move is valid, otherwise it returns false.
     * @param index - The index parameter represents the position of the cell in the board array that needs
     * to be updated.
     * @param marker - The `marker` parameter represents the symbol or marker that will be placed in the
     * cell of the game board. It can be any value that represents a player's move, such as 'X' or 'O'.
     * @returns The function `updateCell` returns `true` if the move is valid and `false` if the move is
     * invalid.
     */

    const updateCell = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            console.log(`updateCell => board: ${board}`)
            return true // valid move
        } 
        return false; // invalid move
    };

    return { getBoard, updateCell };

})();

// Player factory
const Player = (name, markerIcon) => {
    return {name, markerIcon};
};

// UI Module
const UI = (() => {
    /**
     * The `renderGameboard` function updates the display of the game board by setting the content of each
     * cell based on the value stored in the corresponding index of the board array.
     */
    const renderGameboard = () => {
        const board = Gameboard.getBoard();
        const cells = document.querySelectorAll('.cell');

        // board[index] contains the value stored in the cell that was clicked
        cells.forEach((cell, index) => {
            // CHANGE THIS FOR SETTING DISPLAYED CONTENT IN THE CELL
            cell.innerHTML = `<span class="cell-content">${board[index]}</span>`;
        });

        console.log(`renderGameboard => Gameboard re-rendered!`);
    };

    /**
     * The function `attachCellListeners` attaches click event listeners to all cells with the class "cell"
     * and calls the `Game.playTurn` function with the index of the clicked cell as an argument, but only
     * if the game is not over.
     */
    const attachCellListeners = () => {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell, index) => {
          cell.addEventListener('click', () => {
            if (!Game.gameOver) {
              Game.playTurn(index);
            }
          });
        });
      };

    const renderPregameMenu = () => {
        const emojiList = document.getElementById('emoji-list');
        const emojis = ['😀', '🥰', '🚀', '🎉', '❤️', '🌟', '😊', '🐱', '🍕', '🌈'];
        // TODO: Add more options -> https://getemoji.com/
        
        emojis.forEach(emoji => {
            const emojiSpan = document.createElement('span');
            emojiSpan.classList.add('emoji');
            emojiSpan.innerText = emoji;
            emojiList.appendChild(emojiSpan);
        })

    }

    return { renderGameboard, attachCellListeners, renderPregameMenu };
})();

// Game Module
const Game = (() => {
    let currentPlayer;
    let currentPlayerElement = document.getElementById('current-player');
    let gameStatsElement = document.getElementById('game-stats');
    let gameOver = false;

    // Declaring players and setting default values
    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');

    // Arrow function to toggle the currentPlayer, then adjusts the text in the currentPlayerElement
    const togglePlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        currentPlayerElement.innerText = currentPlayer.name;
    };

    /*
        Arrow function to play a turn of the game.
        It calls the updateCell method from the Gameboard module to check if it is a valid move.
        If the move is valid, updateCell

        @param index - The index parameter represents the position of the cell in the board array
        that the player clicked on
    */
    const playTurn = (index) => {
        if (!gameOver) {
            const validMove = Gameboard.updateCell(index, currentPlayer.markerIcon); // Gameboard.updateCell will update the cell content, then return boolean whether the move was valid or not.
            console.log(`playTurn => validMove: ${validMove}`)
            if (validMove) { // If the move is valid
                // TODO: check for win or tie conditions
                UI.renderGameboard(); // Re-renders the gameboard to display the the new moves
                togglePlayer(); // Toggles the current player
            }
        }
    };

    /*
    * The startGame arrow function initializes the game by setting the current player, rendering the gameboard,
    * and attaching cell listeners.
    */
    const startGame = () => {
        currentPlayer = player1;
        currentPlayerElement.innerText = currentPlayer.name;
        gameStatsElement.style.visibility = 'visible'; // reveals the game-stats div
        gameOver = false;
        UI.renderGameboard();
        UI.attachCellListeners();
    };

    let startGameButton = document.getElementById('start-game-btn');
    startGameButton.addEventListener('click', () => {
        startGame();
    });

    UI.renderPregameMenu();

    return {startGame, playTurn};
})();



// Game.startGame();