'use strict';

const SG_CODE = "singapore" ;   //country codes to be used 
const CN_CODE = "romania";
const IND_CODE = "noida";
const INDO_CODE = "indonesia";


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
const { ShiftRegister} = require('johnny-five');
const { Board, Expander, Leds } = require("johnny-five");
const board = new five.Board({   //intitalise board using the internet client host 
  port: new EtherPortClient({
    host: '192.168.137.120', //ip address is based on your own machine
    port: 3030
  }),
  repl: true
});

//defining pins, make sure they are pwm (can test out one by one on your own)


board.on("ready", () => {
  const expander = new Expander({
    controller: "74HC595",
    pins: {
      data: 2,
      clock: 16,
      latch: 15
    }
  });

  const virtual = new Board.Virtual(expander);
  const leds = new Leds(
    Array.from(Array(8), (_, pin) =>
      ({ pin, board: virtual })
    )
  );

 /* const anode = new five.Led.RGB({
   pins : {
     red : leds[4],
     green:leds[5],
     blue : leds[6]
   },
   isAnode: true
 }) */
 const SG_RED = leds[4];
 const SG_GREEN = leds[5];

 const CN_RED = leds[6];
 const CN_GREEN = leds[7];

 const INDIA_RED = leds[0];
 const INDIA_GREEN = leds[1];

 const INDO_RED = leds[2];
 const INDO_GREEN = leds[3];
 



 getAir(SG_CODE).then( result =>{
  console.log(result + " singapore api");

  SG_RED.on();
  SG_GREEN.on();
  SG_GREEN.blink(500);
})

getAir(IND_CODE).then( result => {
  
  INDO_RED.on();
  INDO_GREEN.on();
  INDO_RED.blink(500);
  
  
 
})

getAir(CN_CODE).then( result => {
  
  CN_RED.on();
  CN_GREEN.on();
  CN_RED.blink(500);

})

getAir(INDO_CODE).then(result => {
 
 console.log("This is the code for indoensia" + result);
 INDIA_RED.on();
 INDIA_GREEN.on();
 INDIA_RED.blink(500);
  
})

board.wait(10000, () => {

  // stop() terminates the interval
  // off() shuts the led off
  leds.stop().on();
});

  board.repl.inject({
    leds
  });
});























/* board.on("ready", () => {
  const register = new ShiftRegister({
    pins: {
      data: 2,
      clock: 16,
      latch: 15
    }
  });

 
  var output = 0b10000000;

  board.loop(100, () => {
    output = output > 0 ? output >> 1 : 0b10000000;
    register.send(output);
  });
}); 
 */