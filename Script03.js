const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartBtn');
const message = document.getElementById('message');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const cellIndex = parseInt(e.target.id.split('-')[1]);

    if (board[cellIndex] !== '' || !gameActive) {
        return;
    }

    board[cellIndex] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== '')) {
        message.textContent = `It's a draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    message.textContent = '';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
