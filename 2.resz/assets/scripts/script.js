class Table {
    constructor(size) {
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
        this.couldStepToStart = false;
        this.startPos = {
            row: startRow,
            col: startCol
        };
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


    isWon(){
        let won = true;
        board.matrix.forEach(row => {
            row.forEach(col => {
                if (!col.visited){
                    won = false;
                }
            })
        });


        if(this.availableMoves.length === 0 ){
            const msgPlaceholder = document.getElementById("message");
            if (won){
                clearInterval(secCounter);
                let msg = "Nyertél!";
                if (this.couldStepToStart){
                    msg += " És még vissza is léphetnél a kezdőpontra. Te aztán tudsz valamit! (mondjuk a megoldóalgoritmust?)";
                }
                msgPlaceholder.innerText = msg;
            } else {
                clearInterval(secCounter);
                msgPlaceholder.innerText = "Beszorultál ;(";
            }
        }
        return won;
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
            document.getElementById("steps").innerText = String(this.stepCount);
            this.stepCount++;
            this.getNextMoves();
            this.isWon();
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

        this.couldStepToStart = false
        this.availableMoves.forEach(x => {
            if (x.row == this.startPos.row && x.col == this.startPos.col) {
                this.couldStepToStart = true;
            }
        });

        this.availableMoves = this.availableMoves.filter((cords) => {
            return !board.matrix[cords.row][cords.col].visited;
        });
    }
}

// Ló kezdő pozíció
function getStartPos(event) {
    document.getElementById("message").innerText = "Lépkedj"
    const cellContent = event.target;
    const row = cellContent.attributes.row.value;
    const col = cellContent.attributes.col.value;
    knight = new Knight(row, col);
    //getStartPos törlés a divekről és clickStep hozzáadása
    const divs = Array.from(document.getElementsByTagName("div"));
    divs.forEach(div => {
        div.removeEventListener("click", getStartPos);
        div.addEventListener("click", clickStep);
    });
    addHorse(row, col);
    secCounter = setInterval(function(){
        const display = document.getElementById("stopwatch");
        display.innerText = secondsPassed;
        secondsPassed++;
    },1000);
}
function addHorse(row, col){
    const divek = Array.from(document.getElementsByTagName('div'));
    divek.forEach(element => {
        element.classList.remove("horse");
        let newRow = Number(element.getAttribute("row"));
        let newCol = Number(element.getAttribute("col"));
        if(row == newRow && col == newCol){
            element.classList.add("horse");
        }
    })
}
function clickStep(event) {
    const oldRow = knight.currentPos.row;
    const oldCol = knight.currentPos.col;
    
    const cellContent = event.target;
    const row = cellContent.attributes.row.value;
    const col = cellContent.attributes.col.value;

    
    const madeStep = knight.stepTo(row, col);
    if (madeStep){
        addHorse(row, col);
        drawStepCountOnField(oldRow, oldCol);   
        highlightAvailableFields();
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

function highlightAvailableFields(){
    //A koordináták, amiknek megfelelő html tagjeit ki kell emelni benne vannak a knight.availableMoves-ban. 
      
}

function drawStepCountOnField(row, col,){
    //Bele kell tenni a board.matrix[row][col].stepCount -ot az annak megfelelő html tag-be, hogy látszódjon a felhasználónak a táblán
    const divs = Array.from(document.getElementsByTagName('div'));
    divs.forEach(element => {
        let newRow = Number(element.getAttribute("row"));
        let newCol = Number(element.getAttribute("col"));
        if(row == newRow && col == newCol){
            element.innerText = (knight.stepCount - 1);
            element.classList.add("done");
            
        }
    })
}


let secondsPassed = 0;
let secCounter;
let board;
let knight;

askForNewTable();
