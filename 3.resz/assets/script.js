function getSensorInformation(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			if (this.status == 200) {
                const response = JSON.parse(this.responseText);
                sensors = response.data;       
                sensors.forEach(sonsor => {
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
function drawSensPos(sensor){

}
getSensorInformation();
document.getElementById('fov').addEventListener("click", showFOV)
let sensors;
const canvas = document.getElementById('cnvs');
const ctx = canvas.getContext('2d');