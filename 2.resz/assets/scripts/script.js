class Table {
    constructor(size) {
        this.size = size;
        this.matrix = new Array(size);
        this.matrix.fill(new Array(size));
        this.matrix.forEach(row => row.fill({
            stepCount: 0,
            dangerZone: false,
            visited: false
        }));
    }
}

class Knight {
    constructor(startRow, startCol) {
        this.currentPos = {
            row: Number(startRow),
            col: Number(startCol),
        };
        board.matrix[row][col].visited = true;
        //megváltoztatni a board.matrixban lévő dolgokat
        this.availableMoves = [];
        this.getNextMoves();
        this.stepCount = 0;
    }
    stepto(newRow, newCol) {
        let inAvailableMoves = false;

        this.availableMoves.forEach(x => {
            if(x.row === newRow && x.col === newCol){
                inAvailableMoves = true;
            }
        });
        
        if(inAvailableMoves === true){
         this.currentPos = {
            col: newCol,
            row: newRow
        };
    }
        this.getNextMoves();
    }
    getNextMoves() {
        const trieSteps = [
            { row: -2, col: -1 },
            { row: -2, col: 1 },
            { row: 2, col: -1 },
            { row: 2, col: 1 },
            { row: -1, col: -2 },
            { row: 1, col: -2 },
            { row: -1, col: 2 },
            { row: 1, col: 2 }
        ];

        const trieBoardPlaces = trieSteps.map((cords) => {
            return {
                row: Number(this.currentPos.row) + Number(cords.row),
                col: Number(this.currentPos.col) + Number(cords.col)
            }
        });

        this.availableMoves = trieBoardPlaces.filter((cords) => {
            return !(cords.row < 0 || cords.row >= board.size || cords.col < 0 || cords.col >= board.size);
        });

    }
}

// Ló kezdő pozíció
function getStartPos(event) {
    const cellContent = event.target;
    const row = cellContent.attributes.row.value;
    const col = cellContent.attributes.col.value;
    console.log(row, col);
    knight = new Knight(row, col);
    //getStartPos törlés a divekről és clickStep hozzáadása
    const divs = Array.from(document.getElementsByTagName("div"));
    divs.forEach(div => {
        div.removeEventListener("click", getStartPos);
        div.addEventListener("click", clickStep);
    });
}
<<<<<<< HEAD
 //Egy Function Norbinak 
    function clickStep(event) {
        const cellContent = event.target;
        const row = cellContent.attributes.row.value;
        const col = cellContent.attributes.col.value;
        knight.stepto(row, col);
    }
=======
// Egy Function Norbinak 
function clickStep(event) {
    const cellContent = event.target;
    const row = cellContent.attributes.row.value;
    const col = cellContent.attributes.col.value;
    knight.stepto(row, col);
    // const queryRow = document.querySelector(`div[data-row= ${row}]`);
    // const queryCol = document.querySelector(`div[data-col= ${col}]`);
}
>>>>>>> 33a8c8cb1880edcbae47f6090d9b66a6e8993552


function chessPattern() {
    const divek = Array.from(document.getElementsByTagName('div'));
<<<<<<< HEAD
    const divlength = divek.length;
=======
>>>>>>> 33a8c8cb1880edcbae47f6090d9b66a6e8993552

    if (divek.length % 2 === 0) {
        for (var i = 0; i < divek.length; i++) {
            if (i % 2 === 0) {
                divek[i].classList.add('white');
            } else {
                divek[i].classList.add('black');
            }
        }
<<<<<<< HEAD
    }

=======
    } else {
        for (var i = 0; i < divek.length; i++) {
            if (i % 2 === 0) {
                divek[i].classList.add('white');
            } else {
                divek[i].classList.add('black');
            }
        }
    }
>>>>>>> 33a8c8cb1880edcbae47f6090d9b66a6e8993552
}

function createTable(matrix) {
    const table = document.createElement('table');
    table.setAttribute("id", "mainTable");
    const tableBody = document.createElement('tbody');

    matrix.forEach((rowData, rowNumber) => {
        const row = document.createElement('tr');
        rowData.forEach((apa, colNumber) => {
            const cell = document.createElement('td');
            const cellContent = document.createElement('div');
            cellContent.setAttribute("row", rowNumber);
            cellContent.setAttribute("col", colNumber);
            cellContent.addEventListener("click", getStartPos);
            cell.appendChild(cellContent);
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);

    chessPattern();
}

function askForNewTable() {
    let matrixSize;
    do {
        matrixSize = prompt("Sakktábla mérete (pozitív egész, minimum 5):");
        Math.round(matrixSize);
    } while (isNaN(matrixSize) || matrixSize < 5);
    matrixSize = Math.ceil(Number(matrixSize));
    board = new Table(matrixSize);
    createTable(board.matrix);
}

let board;
let knight;

askForNewTable();