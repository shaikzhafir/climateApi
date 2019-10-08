'use strict';

//let airApi = require('./iss.js');

const fetch = require('node-fetch');

const AQI_API = "https://api.waqi.info/feed/singapore/?token=21f0d11cf0d4752c65ea4d1520d3544966a92c42"

let airQuality = 20;

async function getAir(){
    const response = await fetch("https://api.waqi.info/feed/singapore/?token=API_KEY");
    const data = await response.json();
    airQuality = data.data.aqi;
    console.log(airQuality);
}

 getAir();
 



const {
  EtherPortClient
} = require('etherport-client');
const five = require('johnny-five');
const Led = require('johnny-five');
const board = new five.Board({   //intitalise board using the internet client host 
  port: new EtherPortClient({
    host: '192.168.137.79',
    port: 3030
  }),
  repl: false
});

const LED_PIN = 13;


board.on("ready", () => {
    const led = new five.Led(LED_PIN);
    //console.log(brightness);
    console.log(airQuality);
    led.pulse({
      easing: "linear",
      duration: 1000,
      cuePoints: [0, 1],
      keyFrames: [0, airQuality],
      onstop: function() {
        console.log("Animation stopped");
      }
    });
    
  // Stop and turn off the led pulse loop after
  // 10 seconds (shown in ms)
  board.wait(20000, () => {
    
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
