function getSensorInformation() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                sensors = response.data;
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
    console.log("Megnyomtad");

}

function drawSensPos(sensor) {

}

let moveGlobalx = 0;
let moveGlobaly = 0;
function move(event) {
    moveGlobalx = event.clientX;
    moveGlobaly = event.clientY;
	console.log(`Coords: ${moveGlobalx} ${moveGlobaly}`);
}
function postMove(){
	var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.status == 200) {
				const response = JSON.parse(this.responseText);
				console.log(response)
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
document.getElementById('fov').addEventListener("click", showFOV)
let sensors;
const canvas = document.getElementById('cnvs');
const ctx = canvas.getContext('2d');