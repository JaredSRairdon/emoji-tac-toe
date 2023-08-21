// Gameboard module
const Gameboard = (() => {
    let board = Array(9).fill('');

    const getBoard = () => board; // returns board array when called

    const updateCell = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
             console.log(`updateCell => board[index]: ${board[index]}`)

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

const Game = (() => {
    let currentPlayer;
    let currentPlayerLabel = document.getElementById('current-player');
    let gameOver = false;

    const player1 = Player('Player 1', 'X');
    const player2 = Player('Player 2', 'O');

    const togglePlayer = () => {
        currentPlayer = (currentPlayer === player1) ? player2 : player1;
        currentPlayerLabel.innerText = currentPlayer.name;
    };

    const playTurn = (index) => {
        if (!gameOver) {
            const validMove = Gameboard.updateCell(index, currentPlayer.markerIcon);
            console.log(`playTurn => validMove: ${validMove}`)
            if (validMove) {
                // check for win or tie conditions
                UI.renderGameboard();
                togglePlayer();

            }
        }
    };

    const startGame = () => {
        currentPlayer = player1;
        currentPlayerLabel.innerText = currentPlayer.name;
        gameOver = false;
        UI.renderGameboard();
        UI.attachCellListeners();
        // init game
    };

    return {startGame, playTurn};
})();

const UI = (() => {
    const renderGameboard = () => {
        const board = Gameboard.getBoard();
        const cells = document.querySelectorAll('cell');

        cells.forEach((cell, index) => {
            cell.textContent = board[index];
        });
    };

    const attachCellListeners = () => {
        const cells = document.querySelectorAll('.cell');
    
        cells.forEach((cell, index) => {
          cell.addEventListener('click', () => {
            if (!Game.gameOver) {
              Game.playTurn(index);
            }

            console.log(index);
          });
        });
      };

    return { renderGameboard, attachCellListeners };
})();

Game.startGame();