/*
8 countries
each with 3 colour types, red,green, or orange (for inbetween)
3 different colour levels
*/
const SG_CODE = "singapore" ;   //country codes to be used 
const CHINA_CODE = "china";
const INDIA_CODE = "india";
const INDO_CODE = "indonesia";
const BRAZIL_CODE = "brazil";


const fetch = require('node-fetch'); //required to use fetch function and async await

//async await to call the country, to be replicated inside the board
async function getAir(country){ 
    const response = await fetch("https://api.waqi.info/feed/" + country + "/?token=21f0d11cf0d4752c65ea4d1520d3544966a92c42");
    const data = await response.json();
    let airQuality = data.data.aqi;
    return airQuality;
    
}

const { EtherPortClient} = require('etherport-client');
const five = require('johnny-five');
const Led = require('johnny-five');
const { Board } = require("johnny-five");


const board = new five.Board({   //intitalise board using the internet client host 
    port: new EtherPortClient({
      host: '192.168.137.99', //ip address is based on your own machine
      port: 3030
    }),
    repl: true
  });
  
  //defining pins, make sure they are pwm (can test out one by one on your own)
  

board.on("ready", () => {
     const SG_RED = new five.Led({
    pin: process.argv[2] || 0,
    address: 0x40,
    controller: "PCA9685"
  });
  const SG_GREEN = new five.Led({
    pin: process.argv[2] || 1,
    address: 0x40,
    controller: "PCA9685"
  });
  const INDIA_RED = new five.Led({
    pin: process.argv[2] || 2,
    address: 0x40,
    controller: "PCA9685"
  });
  const INDIA_GREEN = new five.Led({
    pin: process.argv[2] || 3,
    address: 0x40,
    controller: "PCA9685"
  });
  const INDO_RED = new five.Led({
    pin: process.argv[2] || 4,
    address: 0x40,
    controller: "PCA9685"
  });
  const INDO_GREEN = new five.Led({
    pin: process.argv[2] || 5,
    address: 0x40,
    controller: "PCA9685"
  });
  const CHINA_RED = new five.Led({
    pin: process.argv[2] || 6,
    address: 0x40,
    controller: "PCA9685"
  });
  const CHINA_GREEN = new five.Led({
    pin: process.argv[2] || 7,
    address: 0x40,
    controller: "PCA9685"
  });
  const BRAZIL_RED = new five.Led({
    pin: process.argv[2] || 8,
    address: 0x40,
    controller: "PCA9685"
  });
  const BRAZIL_GREEN = new five.Led({
    pin: process.argv[2] || 9,
    address: 0x40,
    controller: "PCA9685"
  });


  /* function aqiCheck(aqiValue){
    if (aqiValue >200){

    }
  } */


  getAir(SG_CODE).then( result =>{
    console.log(result + " =singapore api");
  
    SG_RED.on();
    SG_GREEN.on();
    if (result > 200){
        SG_RED.pulse();
    }
    else if (result > 100){
        SG_GREEN.pulse();
        SG_RED.pulse();
    }
    else{
        SG_GREEN.pulse();
    }


  })

  getAir(INDO_CODE).then( result =>{
    console.log(result + " =indo api");
  
    INDO_RED.on();
    INDO_GREEN.on();
    if (result > 200){
        INDO_RED.pulse();
    }
    else if (result > 100){
        INDO_GREEN.pulse();
        INDO_RED.pulse();
    }
    else{
        INDO_GREEN.pulse();
    }
  })

  getAir(INDIA_CODE).then( result =>{
    console.log(result + " =india aqi");
  
    INDIA_RED.on();
    INDIA_GREEN.on();
    if (result > 200){
        INDIA_RED.pulse();
    }
    else if (result > 100){
        INDIA_GREEN.pulse();
        INDIA_RED.pulse();
    }
    else{
        INDIA_GREEN.pulse();
    }
  })

  getAir(CHINA_CODE).then( result =>{
    console.log(result + " =china aqi");
  
    CHINA_RED.on();
    CHINA_GREEN.on();
    if (result > 200){
        CHINA_RED.pulse();
    }
    else if (result > 100){
        CHINA_GREEN.pulse();
        CHINA_RED.pulse();
    }
    else{
        CHINA_GREEN.pulse();
    }
  })

  getAir(BRAZIL_CODE).then( result =>{
    console.log(result + " =brazil aqi");
  
    BRAZIL_RED.on();
    BRAZIL_GREEN.on();
    if (result > 200){
        BRAZIL_RED.pulse();
    }
    else if (result > 100){
        BRAZIL_GREEN.pulse();
        BRAZIL_RED.pulse();
    }
    else{
        BRAZIL_GREEN.pulse();
    }
  })

  
    
  });