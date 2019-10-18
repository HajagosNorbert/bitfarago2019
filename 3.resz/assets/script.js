const canvas = document.getElementById('cnvs');
const ctx = canvas.getContext('2d');

const senPos = ["s1pos", "s2pos", "s3pos", "s4pos"];

document.getElementById('fov').addEventListener("click", showFOV)

function getSensorInformation() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                sensors = response.data;
                sensors.forEach(sensor => {
                    drawSensPos(sensor);
                    writeSensPos(sensor);
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

}

function drawDetectionArea(id, signal, angle) {
    if (signal) {
        const r = 400;
        const sensor = sensors[id];
        const errorValue = 2 * Math.PI / 180;

        ctx.fillStyle = "#de1d1d";

        ctx.beginPath();
        ctx.moveTo(sensor.posx, sensor.posy);
        ctx.lineTo(sensor.posx + r * Math.cos(sensor.anglerad + angle + errorValue), sensor.posy + r * Math.sin(sensor.anglerad + angle + errorValue));
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(sensor.posx, sensor.posy);
        ctx.lineTo(sensor.posx + r * Math.cos(sensor.anglerad + angle - errorValue), sensor.posy + r * Math.sin(sensor.anglerad + angle - errorValue));
        ctx.stroke();
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(sensor.posx, sensor.posy);

        ctx.arc(sensor.posx, sensor.posy, r, sensor.anglerad + angle - errorValue, sensor.anglerad + angle + errorValue);
        ctx.stroke();
        ctx.restore();
    }
}

function writeSensPos(sensor) {
    id = sensor.ID;
    x = sensor.posx;
    y = sensor.posy;

    document.getElementById(senPos[id]).innerText = `X: ${x} Y: ${y}`;
}

function drawSensPos(sensor) {
    x = sensor.posx;
    y = sensor.posy;
    a = sensor.angle;

    ctx.fillStyle = "#de1d1d";
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
}

let moveGlobalx = 0;
let moveGlobaly = 0;

function move(event) {
    const area = canvas.getBoundingClientRect();
    moveGlobalx = event.clientX - area.left;
    moveGlobaly = event.clientY - area.top;
    postMove();
    redrawCanvas();
}

function postMove() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                response.data.forEach(cameraData => {
                    const angle = (Math.PI / 180) * cameraData.angle;
                    drawDetectionArea(cameraData.id, cameraData.signal, angle)
                });
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

function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRedPoint();
    sensors.forEach(s => drawSensPos(s));
}

function drawRedPoint() {
    ctx.beginPath();
    ctx.arc(moveGlobalx, moveGlobaly, 5, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.restore();
}

getSensorInformation();

let fov = false;
let sensors;