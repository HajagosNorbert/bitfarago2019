function getSensorInformation() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                sensors = response.data;
                drawSensPos(sensors);
                /* sensors.forEach(sensor => {
                    drawSensPos(sensor);
                }); */
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
    console.log("Megnyomtad");
}

function drawSensPos(sensors) {
    for (var i = 0; i < sensors.length; i++) {
        const x = sensors[i].posx;
        const y = sensors[i].posy;
        const a = sensors[i].angle;
        console.log(`${x} ${y} ${a}`);
        ctx.fillStyle = "#de1d1d";
        ctx.fillRect(x, y, 32, 32);
        ctx.rotate(a);
        ctx.restore();
    }
}

let moveGlobalx = 0;
let moveGlobaly = 0;
function move(event) {
    moveGlobalx = event.clientX;
	moveGlobaly = event.clientY;
	console.log(`Coords: ${moveGlobalx} ${moveGlobaly}`);
	postMove();
}
function postMove(){
	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
				const response = JSON.parse(this.responseText);
				console.log(response)
				drawDetectionArea(id, signal, angle);
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


const canvas = document.getElementById('cnvs');
const ctx = canvas.getContext('2d');

const s1 = document.getElementById('sensor1pos');
const s2 = document.getElementById('sensor2pos');
const s3 = document.getElementById('sensor3pos');
const s4 = document.getElementById('sensor4pos');

document.getElementById('fov').addEventListener("click", showFOV)

let sensors;
