


const ISS_API = "https://api.wheretheiss.at/v1/satellites/25544"

setInterval(getISS, 500);


async function getISS() {
    const response = await fetch(ISS_API);
    const data = await response.json();
    console.log(data.altitude);
    const { latitude, longitude} = data; //javascript destrucutirng 
    const latitude = data.latitude;
    
    console.log(latitude);
    console.log(longitude);
    
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;

}

getISS();


exports.getISS = getISS();
