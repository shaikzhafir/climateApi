const { EtherPortClient} = require('etherport-client');
const five = require('johnny-five');
const Led = require('johnny-five');
const { Board, Expander} = require('johnny-five');
const board = new five.Board({   //intitalise board using the internet client host 
  port: new EtherPortClient({
    host: '192.168.137.129', //ip address is based on your own machine
    port: 3030
  }),
  repl: true
});




board.on("ready", () => {
  const led = new Led(16);

  // This will grant access to the led instance
  // from within the REPL that's created when
  // running this program.
  board.repl.inject({
    led
  });

  led.blink();
});