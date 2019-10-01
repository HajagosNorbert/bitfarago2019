class Table {
    constructor(size) {
        this.size = size;
        this.matrix = new Array(size);
        this.matrix.fill(new Array(size));
        this.matrix.forEach(row => row.fill("táblarész"));
    }

}

class Knight {
    constructor(startRow, StartCol){
        this.currentPos = {
            row: startRow,
            col: startPos
        };
        this.stepCount = 0;
    }
}

// IDE KELL STÍLUSOZÁS
function drawCellContent(cellContent, color) {
    const size = Math.floor(100 / board.size)*5;
    if (color === 'white') {
      cellContent.setAttribute(
        `style`,
        `color: black; background-color: white; border: 1px solid black; width: ${size}px; height: ${size}px;`);
    } else {
      cellContent.setAttribute(
        `style`,
        `color: white; background-color: black; border: 1px solid black; width: ${size}px; height: ${size}px;`);
    }
  }

function switchColor(event) {
    const cellContent = event.target;
    const row = cellContent.attributes.row.value;
    const col = cellContent.attributes.col.value;
    console.log(row, col);

    //drawCellContent(cellContent, color);
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
            cellContent.addEventListener("click", switchColor);
            drawCellContent(cellContent, color);
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
        matrixSize = prompt("Sakktábla mérete (poitív szám):");
    } while (isNaN(matrixSize) || matrixSize <= 0);
    matrixSize = Math.ceil(Number(matrixSize));
    board = new Table(matrixSize);
    createTable(board.matrix);

}
let board;
askForNewTable();
