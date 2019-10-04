'use strict';

//code that is used to grab the data from the api 
const ISS_API = "https://api.wheretheiss.at/v1/satellites/25544"

const fetch = require('node-fetch');

var foo = "bar";

const get_data = async url => {
  try {
    const response = await fetch(url);
    const json = await response.json();
   // console.log(json);
    foo = json.altitude;
    //console.log(foo);
    //console.log(latitude);
  } catch (error) {
    console.log(error);
  }
};

get_data(ISS_API);



/* async function getISS() {
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
console.log(data);
 */


const {
  EtherPortClient
} = require('etherport-client');
const five = require('johnny-five');
const Led = require('johnny-five');
const board = new five.Board({   //intitalise board using the internet client host 
  port: new EtherPortClient({
    host: '192.168.137.128',
    port: 3030
  }),
  repl: false
});

const LED_PIN = 0;


board.on("ready", () => {
    const led = new five.Led(LED_PIN);
  
    led.pulse();
    get_data(ISS_API);
    console.log(foo + "im here");
    
  // Stop and turn off the led pulse loop after
  // 10 seconds (shown in ms)
  board.wait(10000, () => {
    
    // stop() terminates the interval
    // off() shuts the led off
    led.stop().off();
  });
  });




/* board.on('ready', () => {
  board.pinMode(LED_PIN, five.Pin.OUTPUT);
  // the Led class was acting hinky, so just using Pin here
  const pin = five.Pin(LED_PIN);
  let value = 0;
  setInterval(() => {
    if (value) {
      pin.high();
      value = 0;
    } else {
      pin.low();
      value = 1;
    }
  }, 500);
}); */
