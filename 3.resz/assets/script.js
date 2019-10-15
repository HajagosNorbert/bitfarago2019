function start() {

}

function showFOV() {
    console.log("Megnyomtad");

}

class Point {
    constructor(xPos, yPos) {

    }
}

function move(event) {
    const x = event.clientX;
    const y = event.clientY;

    console.log(`Coords: ${x} ${y}`);
}

document.getElementById('fov').addEventListener("click", showFOV)
const canvas = document.getElementById('cnvs');
const ctx = canvas.getContext('2d');