const canvas = document.getElementById('cnvs');
const ctx = canvas.getContext('2d');

const sens = ["'s1pos'", "'s2pos'", "'s3pos'", "'s4pos'"];

document.getElementById('fov').addEventListener("click", showFOV)

function getSensorInformation() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                sensors = response.data;
                console.log(sensors);
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
}
function drawDetectionArea(id, signal, angle) {
    if (signal) {
        const sensor = sensors[id];
        ctx.fillStyle = "#de1d1d";
        ctx.beginPath();
        ctx.moveTo(sensor.posx, sensor.posy);
        //This is line isn't working as intended.
        //ctx.arc(sensor.posx, sensor.posy, 400, sensor.angle + angle, Math.PI/180);
        ctx.stroke();
        ctx.restore();
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
}

function writePosInformations(x, y) {
    for (var i in sens) {
        document.getElementById(i).innerText = "teszt";
    }
}

let moveGlobalx = 0;
let moveGlobaly = 0;
function move(event) {
    const area = canvas.getBoundingClientRect();
    moveGlobalx = event.clientX - area.left;
    moveGlobaly = event.clientY - area.top;
    postMove();
}
function postMove() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                console.log(response)
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

postMove();
getSensorInformation();

let sensors;
