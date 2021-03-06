    
const SerialPort = require('serialport'); // Why is this an error
const DelimiterParser = require('@serialport/parser-delimiter');

let port = undefined;
let parser = undefined;
const listeners = [];

function openPort(testFunction, delimiter) {
  if (!port && !parser) {
    SerialPort.list()
    // log all the ports
    .then(p => { console.log(p); return p; })
    .then(ports => ports.find(testFunction))
    .then(portInfo => {
      port = new SerialPort(portInfo.comName);
      parser = port.pipe(new DelimiterParser({ delimiter: delimiter }));

      // Connect listener to port
      parser.on('data', d => {
        if (listeners.length > 0) listeners.forEach(l => l(d.toString()));
      });
    });
  } else {
    throw new Error('Serial Port Reader Instance Already Connected!');
  }
}

function addListener(listener) {
  listeners.push(listener);
}

module.exports = {
  openPort: openPort,
  addListener: addListener,
};