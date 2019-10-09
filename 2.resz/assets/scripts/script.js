class Table {
    constructor(size) {
        //A 2. szintű (col) array-ek mind ugyan arra az ojektumra mutatnak.
        this.size = size;
        this.matrix = [];
        for(let row = 0; row < size; row++){
            
            this.matrix.push([]);
            for(let col = 0; col < size; col++){
                this.matrix[row].push({
                    visited: false,
                    stepCount: 0,
                    dangerZone: false
                });
            }
        }   
    }
}

class Knight {
    constructor(startRow, startCol) {
        startRow = Number(startRow);
        startCol = Number(startCol);
        this.stepCount = 0;
        this.currentPos = {
            row: startRow,
            col: startCol
        };
        this.availableMoves = [];
        board.matrix[startRow][startCol].visited= true;
        board.matrix[startRow][startCol].stepCount= this.stepCount;
        this.stepCount++;
        this.getNextMoves();
    }

    stepTo(newRow, newCol) {
        let inAvailableMoves = false;

        this.availableMoves.forEach(x => {
            if (x.row == newRow && x.col == newCol) {
                inAvailableMoves = true;
            }
        });

        if (inAvailableMoves) {
            this.currentPos.row = newRow;
            this.currentPos.col = newCol;
            board.matrix[newRow][newCol].stepCount = this.stepCount;
            board.matrix[newRow][newCol].visited = true;
            this.stepCount++;
            this.getNextMoves();
            return true;
        }
        return false;
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

        this.availableMoves = this.availableMoves.filter((cords) => {
            return !board.matrix[cords.row][cords.col].visited;
        });

        if(this.availableMoves.length === 0){
            alert("Beszorultál");
        }
    }
}

// Ló kezdő pozíció
function getStartPos(event) {
    const cellContent = event.target;
    const row = cellContent.attributes.row.value;
    const col = cellContent.attributes.col.value;
    console.log(`kezdés itt row: ${row},col: ${col}`);
    knight = new Knight(row, col);
    //getStartPos törlés a divekről és clickStep hozzáadása
    const divs = Array.from(document.getElementsByTagName("div"));
    divs.forEach(div => {
        div.removeEventListener("click", getStartPos);
        div.addEventListener("click", clickStep);
    });
    addHorse(row, col);
}
function addHorse(row, col){
    const divek = Array.from(document.getElementsByTagName('div'));
    divek.forEach(element => {
        element.classList.remove("horse");
        let newRow = Number(element.getAttribute("row"));
        let newCol = Number(element.getAttribute("col"));
        if(row == newRow && col == newCol){
            console.log("itt vagyok!");
            element.classList.add("horse");
        }
    })
}
function clickStep(event) {
    const cellContent = event.target;
    const row = cellContent.attributes.row.value;
    const col = cellContent.attributes.col.value;
    addHorse(row, col);
    const madeStep = knight.stepTo(row, col);
    if (madeStep){
        console.log(`Léptél ide row: ${row}, col: ${col}`);
    } else {
        console.log("Nem léphetsz ide");
    }
}

function createTable(matrix) {
    const table = document.createElement('table');
    table.setAttribute("id", "mainTable");
    const tableBody = document.createElement('tbody');

    matrix.forEach((rowData, rowNumber) => {
        const row = document.createElement('tr');
        rowData.forEach((_apa, colNumber) => {
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
}

function askForNewTable() {
    let matrixSize;
    do {
        matrixSize = prompt("Sakktábla mérete (pozitív egész, minimum 5):");
    } while (isNaN(matrixSize) || matrixSize < 5);
    matrixSize = Math.ceil(Number(matrixSize));
    board = new Table(matrixSize);
    createTable(board.matrix);
}

let board;
let knight;

askForNewTable();
