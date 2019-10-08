
const fetch = require('node-fetch');

const ISS_API = "https://api.wheretheiss.at/v1/satellites/25544"

//setInterval(getISS, 500);


async function getISS() {
    const response = await fetch(ISS_API);
    const data = await response.json();
    console.log(data.altitude);
    const { latitude, longitude} = data; //javascript destrucutirng 
    
    
    console.log(latitude);
    console.log(longitude);
    
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;

}

//getISS();
let country = "singapore";

const AQI_API = "https://api.waqi.info/feed/singapore/?token=21f0d11cf0d4752c65ea4d1520d3544966a92c42"

async function getAir(){
    const response = await fetch(AQI_API);
    const data = await response.json();
    const airQuality = data.data.aqi;
    console.log(airQuality + "here");
}

//getAir();

module.exports = {
    getAir,
    AQI_API

}









