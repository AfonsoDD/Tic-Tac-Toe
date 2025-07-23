const gameController = function (player1, player2) {

    // Initial conditions

    const gameboard = []
    let win = false; 
    let turn = 0;

    function initializeGameboard () {

        const rows = 3;
        const columns = 3;
        let z = 1;
    
        for (let i = 0; i < rows; i++) {
            gameboard[i] = [];
            for (let j = 0; j < columns; j++) {
                gameboard[i].push(z);
                z++;
            }
        } 
        return gameboard
    };

    function checkTurn() { // method to check the turn
        return `This is turn ${turn}`;
    }

    function checkPlayers() { // method to check the players
        return `Player 1: ${player1.name}, Symbol: ${player1.symbol} \n Player 2: ${player2.name}, Symbol: ${player2.symbol}`;
    }

    function checkBoard() { // method to check the board
        return gameboard;
    }

    function winCheck (currentPlayer) { // private function to check for wins

        let rows = 3;
        let columns = 3;
        let symbol = "";
        let winnerMessage = "We have a Draw!";
    
        for (let i = 0; i < rows; i++) { // horizontal check
            if (gameboard[i][0] === gameboard[i][1] && gameboard[i][0] === gameboard[i][2]) {
                win = true;
                winnerMessage = `${currentPlayer.name} wins!`;
                symbol = gameboard[i][0];
                break;
            }}
    
        for (let i = 0; i < columns; i++) { // vertical check
            if (gameboard[0][i] === gameboard[1][i] && gameboard[0][i] === gameboard[2][i]) {
                win = true;
                winnerMessage = `${currentPlayer.name} wins!`;
                symbol = gameboard[0][i];
                break;
            }}
    
        let j = 1;
        if (
        (gameboard[j][j] === gameboard[j-1][j-1] && gameboard[j][j] === gameboard[j+1][j+1]) || // Main diagonal check
        (gameboard[j][j] === gameboard[j+1][j-1] && gameboard[j][j] === gameboard[j-1][j+1])) { // Secondary diagonal check
            win = true;
            winnerMessage = `${currentPlayer.name} wins!`;
            console.log(winnerMessage);
            symbol = gameboard[j][j];
        }
    
        return win ? { win, symbol, winnerMessage} : { win , winnerMessage }
    }

    function newGame () {
        const playAgain = document.querySelector(".play-again");
        playAgain.style.display = "flex";

        const playAgainButton = document.querySelector(".play-again-btn");
        playAgainButton.addEventListener("click", () => {
            
            playAgain.style.display = "none";
            letsPlay(player1, player2)
        })
    }

    function letsPlay (player1, player2) {

        initializeGameboard()
        win = false;
        turn = 0;

        function displayBoard (gameboard) {

            let victoryMessage = document.querySelector("h2");
            let boardContainer = document.querySelector(".board-container");
            boardContainer.innerHTML = "" // cleaning for new game
            boardContainer.style.display = "grid";

            for (let i = 0; i < gameboard.length; i++) {    
                for (let j = 0; j < gameboard[i].length; j++) {
                    let cell = document.createElement("div");
                    cell.dataset.row = i; // creates a dataset of the grid. This dataset is a HTML property as seen in DevTools > Elements > Properties, for each cell
                    cell.dataset.column = j; // same as above, one property is the row, another the column, as a normal matrix/grid
                    cell.classList.add("not-clicked")
                    cell.classList.add("gameboard-cell")
                    boardContainer.appendChild(cell);

                    cell.addEventListener("click", () => {
                        if (cell.classList.contains("not-clicked")) { // guarantees that we don't click the same cell twice in one game, acting together with line 105
                            const currentPlayer = turn%2 === 0 ? player1 : player2;

                            cell.innerHTML = currentPlayer.symbol; // updates the UI

                            const row = parseInt(cell.dataset.row); // uses the previous dataset to extract the row
                            const column = parseInt(cell.dataset.column); // uses the previous datasat to extract the column
                            gameboard[row][column] = currentPlayer.symbol; // updates the gameboard accordingly

                            cell.classList.remove("not-clicked");
                            turn++;

                            const result = winCheck(currentPlayer);
                            if (result.win) {
                                boardContainer.innerHTML = "";
                                boardContainer.style.display = "none";
                                victoryMessage.innerText = result.winnerMessage;
                                newGame();
                            } else if (turn === 9) { // draw
                                boardContainer.innerHTML = "";
                                boardContainer.style.display = "none";
                                victoryMessage.innerText = result.winnerMessage;
                                newGame();
                        }}})
                }
            }
        }

        displayBoard(gameboard)
    }
    return { letsPlay, checkTurn, checkPlayers }
}

// Gameboard Module

// Player Object Constructor

const Player = function (name, symbol) {
    return { name, symbol }
}

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.style.display = "none";

    const player1 = Player(form.elements["player1-name"].value, form.elements["player1-symbol"].value);
    const player2 = Player(form.elements["player2-name"].value, form.elements["player2-symbol"].value);

    const game = gameController(player1,player2);

    game.letsPlay(player1, player2);
})


/* ----------------------------------------------------------------------------------------------------------

// Legacy functions (for console game)

function askForPlay() { // private function to ask for play (only relevant in console)
    let row = parseInt(prompt("Enter a number from 0 to 2."));
    let column = parseInt(prompt("Enter a number from 0 to 2."));
    return { row, column };
}

function play (symbol, i, j) { // private function to run a play

    if (gameboard[i][j] === player1.symbol || gameboard[i][j] === player2.symbol) { // checking for valid plays
        console.log("Please make a valid play");
        return false;
    } else { // if it is a valid play, we update the board and the turn
        gameboard[i][j] = symbol;
        console.log(gameboard)
        console.log(`This was turn ${turn}.`)
        return true;
    }
}

function runGameOnConsole () { // function to run the game on console

    while (turn < 9 && !win) {

        let currentPlayer = turn%2 === 0 ? player1 : player2;
        let move = askForPlay();
        if (play(currentPlayer.symbol, move.row, move.column)) {
            turn++;
            let result = winCheck();
            if (result.win) {
                console.log(`${currentPlayer.name} wins!`);
                win = true;
            }
        return result} 
    }
}

---------------------------------------------------------------------------------------------------------- */




