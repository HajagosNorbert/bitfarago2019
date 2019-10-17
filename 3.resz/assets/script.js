const canvas = document.getElementById('cnvs');
const ctx = canvas.getContext('2d');

document.getElementById('fov').addEventListener("click", showFOV)

const s1 = document.getElementById('sensor1pos');
const s2 = document.getElementById('sensor2pos');
const s3 = document.getElementById('sensor3pos');
const s4 = document.getElementById('sensor4pos');

function getSensorInformation() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                sensors = response.data;
                console.log(sensors);
                /* drawSensPos(sensors); */
                sensors.forEach(sensor => {
                    drawSensPos(sensor);
                });
            }
        }
    };
    xhr.open('POST', 'http://bitkozpont.mik.uni-pannon.hu/Vigyazz3SensorData.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify({
        request: 'sensors'
    }));
}

function showFOV() {
    console.log('Megnyomtad');
    drawDetectionArea(1, true, 40);
}

function drawDetectionArea(id, signal, x, y, angle) {
    if (signal) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(sensors[id].posx, sensors[id].posy);
        ctx.stroke();
    }
}

function drawSensPos(sensor) {
    x = sensor.posx;
    y = sensor.posy;
    a = sensor.angle;

    console.log(`${x} ${y} ${a}`);

    ctx.fillStyle = "#de1d1d";
    ctx.beginPath();
    ctx.arc(x, y, 32, 0, 2 * Math.PI);
    ctx.stroke();
    //ctx.rotate(a);
    ctx.restore();

    setSensorPos(x, y);
}

function setSensorPos(x, y) {

}

let moveGlobalx = 0;
let moveGlobaly = 0;

function move(event) {
    const area = canvas.getBoundingClientRect();
    moveGlobalx = event.clientX - area.left;
    moveGlobaly = event.clientY - area.top;
    console.log(`Coords: ${moveGlobalx} ${moveGlobaly}`);
    postMove();
}

function postMove() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                console.log(response)
                drawDetectionArea(response.id, response.signal, response.angle);
            }
        }
    };
    xhr.open('POST', 'http://bitkozpont.mik.uni-pannon.hu/Vigyazz3SensorData.php', true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(JSON.stringify({
        request: 'sensordata',
        version: '1',
        posx: `${moveGlobalx}`,
        posy: `${moveGlobaly}`

    }));
}

postMove();
getSensorInformation();

let sensors;