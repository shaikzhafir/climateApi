'use strict';

const SG_CODE = "singapore" ;   //country codes to be used 
const CN_CODE = "romania";
const IND_CODE = "turkey";



const fetch = require('node-fetch'); //required to use fetch function and async await

//async await to call the country, to be replicated inside the board
async function getAir(country){ 
    const response = await fetch("https://api.waqi.info/feed/" + country + "/?token=21f0d11cf0d4752c65ea4d1520d3544966a92c42");
    const data = await response.json();
    let airQuality = data.data.aqi;
    return airQuality;
    
}

//connecting the huzzah to hotspot
const { EtherPortClient} = require('etherport-client');
const five = require('johnny-five');
const Led = require('johnny-five');
const board = new five.Board({   //intitalise board using the internet client host 
  port: new EtherPortClient({
    host: '192.168.137.93', //ip address is based on your own machine
    port: 3030
  }),
  repl: false
});

//defining pins, make sure they are pwm (can test out one by one on your own)
const LED_SG = 13;
const LED_IND = 15;
const LED_CN = 14;


board.on("ready", () => {
    const ledSg = new five.Led(LED_SG);
    const ledInd = new five.Led(LED_IND);
    const ledCn = new five.Led(LED_CN);
    //console.log(brightness);
   
    //after getair function is done, using the return value of the air quality, set it to be the brightness variable
    getAir(SG_CODE).then( result =>{
      console.log(result + " singapore api");
      ledSg.pulse({
        easing: "linear",
        duration: 1000,
        cuePoints: [0, 1],
        keyFrames: [0, result],
        onstop: function() {
          console.log("Animation stopped");
        }
      });
    })

    getAir(IND_CODE).then( result => {
      console.log(result + " india api")
      ledInd.pulse({
        easing: "linear",
        duration: 1000,
        cuePoints: [0, 1],
        keyFrames: [0, result],
        onstop: function() {
          console.log("Animation stopped");
        }
      });
    })
    
    getAir(CN_CODE).then( result => {
      console.log(result + " china api")
      ledCn.pulse({
        easing: "linear",
        duration: 1000,
        cuePoints: [0, 1],
        keyFrames: [0, result],
        onstop: function() {
          console.log("Animation stopped");
        }
      });
    })

  });
