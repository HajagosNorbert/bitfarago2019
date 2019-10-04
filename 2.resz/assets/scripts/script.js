class Table {
    constructor(size) {
        this.size = size;
        this.matrix = new Array(size);
        this.matrix.fill(new Array(size));
        this.matrix.forEach(row => row.fill("táblarész"));
    }

}

class Knight {
    constructor(startRow, startCol) {
        this.currentPos = {
            row: Number(startRow),
            col: Number(startCol),
        };

        this.availableMoves = [];
        this.getNextMoves();
        console.log("Hi");
        this.stepCount = 0;
    }
    stepto(newRow, newCol){
        this.currentPos = {
            col: newCol,
            row: newRow
        };
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
        const trieBoardPlaces = trieSteps.filter((cords) => {
            return cords.row < 0 || cords.row >= board.size || cords.col < 0 || cords.col >= board.size;
        });
        
        this.availableMoves = trieBoardPlaces.map(cords => {      
            return {
                row: Number(this.currentPos.row) + Number(cords.row),
                col: Number(this.currentPos.col) + Number(cords.col)
            }
        });

        
    }
}


//Ló kezdő pozíció
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
 //Egy Function Norbinak 
    function clickStep(event) {
        const cellContent = event.target;
        const row = cellContent.attributes.row.value;
        const col = cellContent.attributes.col.value;
        knight.stepto(row, col);
        // const queryRow = document.querySelector(`div[data-row= ${row}]`);
        // const queryCol = document.querySelector(`div[data-col= ${col}]`);

    }

function chessPattern(cellContent, colNumber) {
    cellContent.classList.add("black");
    // szenvedésem
    for (var i = 0; i < colNumber; i++) {
        for (var j = 0; j < colNumber; j++) {
            if (colNumber % 2) {
                cellContent.classList.add('white');
            } else {
                cellContent.classList.add('black');
            }
        }
    }
}

function createTable(matrix) {
    const table = document.createElement('table');
    table.setAttribute("id", "mainTable");
    const tableBody = document.createElement('tbody');

    matrix.forEach((rowData, rowNumber) => {
        const row = document.createElement('tr');
        rowData.forEach((color, colNumber) => {
            const cell = document.createElement('td');
            const cellContent = document.createElement("div");
            cellContent.setAttribute("row", rowNumber);
            cellContent.setAttribute("col", colNumber);
            chessPattern(cellContent, colNumber);
            cellContent.addEventListener("click", getStartPos);
            cell.appendChild(cellContent);
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });

    table.appendChild(tableBody);
    document.body.appendChild(table);
}


function askForNewTable() {
    let matrixSize;
    do {
        matrixSize = prompt("Sakktábla mérete (poitív szám, minimum 5):");
    } while (isNaN(matrixSize) || matrixSize < 5);
    matrixSize = Math.ceil(Number(matrixSize));
    board = new Table(matrixSize);
    createTable(board.matrix);
}
let board;
let knight;
askForNewTable();