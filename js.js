/* 
    *
    Declaración de variables y constantes 
    *
*/
var playerGame = 'X';
const btnX = document.getElementById('x');
const btnO = document.getElementById('o');
var gameMatrix = [[], [], []];
var winnerIs = '';
var movimentsCount = 0;

/* 
    *
    Eventos 
    *
*/

btnX.addEventListener('click', () => {
    changePlayerOpt('X');
    resetGame();
});

btnO.addEventListener('click', () => {
    changePlayerOpt('O');
    resetGame();
});

/* 
    *
    Funciones 
    *
*/

// Función para cambiar la selección del juagador
const changePlayerOpt = playerMode => {
    const normalClass = 'btn';
    const selectClass = 'btn-select';
    playerGame = playerMode;
    if (playerMode == 'X') {
        btnX.classList.remove(normalClass);
        btnX.classList.add(selectClass);
        // 
        btnO.classList.remove(selectClass);
        btnO.classList.add(normalClass);
    } else if (playerMode == 'O') {
        btnO.classList.remove(normalClass);
        btnO.classList.add(selectClass);
        // 
        btnX.classList.remove(selectClass);
        btnX.classList.add(normalClass);
    } else {
        location.reload();
    }
}
// Función para añadir una entrada por el ususario
const addNewEntry = id => {
    // Añadir miviimiento
    if (id <= 2) {
        if (gameMatrix[0][id]) {
            alert('Ocupado!');
            return;
        }
        gameMatrix[0][id] = playerGame;
        renderGame();
        movimentsCount++;
        if (!hasWinner()) {
            gameBot();
            hasWinner();
        }
        if (movimentsCount == 9) {
            movimentsCount = 0;
            alert('Empate!');
            resetGame();
            return;
        }
    } else if (id > 2 && id <= 5) {
        if (gameMatrix[1][id - 3]) {
            alert('Ocupado!');
            return;
        }
        gameMatrix[1][id - 3] = playerGame;
        renderGame();
        movimentsCount++;
        if (!hasWinner()) {
            gameBot();
            hasWinner();
        }
        if (movimentsCount == 9) {
            movimentsCount = 0;
            alert('Empate!');
            resetGame();
            return;
        }
    } else if (id > 5 && id <= 8) {
        if (gameMatrix[2][id - 6]) {
            alert('Ocupado!');
            return;
        }
        gameMatrix[2][id - 6] = playerGame;
        renderGame();
        movimentsCount++;
        if (!hasWinner()) {
            gameBot();
            hasWinner();
        }
        if (movimentsCount == 9) {
            movimentsCount = 0;
            alert('Empate!');
            resetGame();
            return;
        }
    } else {
        location.reload();
    }
}
// Función para mostrar en la vista la matrix de juego
const renderGame = () => {
    for (var i = 0; i < gameMatrix.length; i++) {
        for (var j = 0; j < gameMatrix[i].length; j++) {
            var temCell = null;
            if (i == 0) {
                temCell = document.getElementById(j);
            } else if (i == 1) {
                temCell = document.getElementById(j + 3);
            } else if (i == 2) {
                temCell = document.getElementById(j + 6);
            }
            temCell.textContent = gameMatrix[i][j];
        }
    }
}
// Función para validar si hay un ganador
const hasWinner = () => {
    var validator = '';
    // Validar las celdas Horizontales
    for (var i = 0; i < 3; i++) {
        validator = '';
        for (var j = 0; j < 3; j++) {
            if (gameMatrix[i][j] != undefined) {
                validator += gameMatrix[i][j];
            }
        }
        if (validator == 'XXX' || validator == 'OOO') {
            winnerIs = validator;
            isWinner();
            resetGame();
            return true;
        }
    }
    // Validar las celdas Verticales
    for (var i = 0; i < gameMatrix.length; i++) {
        validator = '';
        for (var j = 0; j < 3; j++) {
            if (gameMatrix[j][i] != undefined) {
                validator += gameMatrix[j][i];
            }
        }
        if (validator == 'XXX' || validator == 'OOO') {
            winnerIs = validator;
            isWinner();
            resetGame();
            return true;
        }
    }
    //Validar las diagonales
    validator = `${gameMatrix[0][0]}${gameMatrix[1][1]}${gameMatrix[2][2]}`;
    if (validator == 'XXX' || validator == 'OOO') {
        winnerIs = validator;
        isWinner();
        resetGame();
        return true;
    }
    validator = `${gameMatrix[0][2]}${gameMatrix[1][1]}${gameMatrix[2][0]}`;
    if (validator == 'XXX' || validator == 'OOO') {
        winnerIs = validator;
        isWinner();
        resetGame();
        return true;
    }
}
// Funcion para restablecer el juego
const resetGame = () => {
    gameMatrix = [[], [], []];
    for (var i = 0; i < 9; i++) {
        document.getElementById(i).textContent = '';
    }
}
//Bot del juego
const gameBot = () => {
    var botPlay = 'O';
    var h = 0;
    var v = 0;
    const position = Math.floor(Math.random() * (8 - 0 + 1) + 0);
    if (playerGame == 'O') {
        botPlay = 'X';
    }
    if (position <= 2) {
        v = position;
    } else if (position > 2 && position <= 5) {
        h = 1;
        v = position - 3;
    } else if (position > 5 && position <= 8) {
        h = 2;
        v = position - 6;
    }
    // Validar si la posición rojada está ocupada
    if (gameMatrix[h][v]) {
        gameBot();
        return;
    } else {
        gameMatrix[h][v] = botPlay;
        movimentsCount++;
        renderGame();
    }
}
// Cuando hay un ganador
const isWinner = () => {
    winnerIs = winnerIs.substring(0, 1);
    if (winnerIs == playerGame) {
        alert('¡Has ganado!');
    } else {
        alert('La maquina ha ganado :(');
    }
    winnerIs = '';
    movimentsCount = 0;
}

/* 
    *
    Demos 
    *
*/
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // loadAllCells();
        // gameBot();
    }, 2000)
})

const loadAllCells = () => {
    const arryElements = document.getElementsByClassName('item');
    for (let i = 0; i < arryElements.length; i++) {
        arryElements[i].textContent = i;
    }
}
