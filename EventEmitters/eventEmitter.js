const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', () => {
    // Default. added at the end of the listener arrays
    // prependListener adds the listener to the beginning of the listeners array.
    console.log('An event occurred!');
});

myEmitter.on('eventFuncArgsArrow', (a, b) => {
    console.log(a, b, this)
    //'this' on Arrow function doesn't 
    // reference the EventEmitter instance where the listener is attached
})

myEmitter.on('eventFuncArgs', function (a, b) {
    console.log(a, b, this)
    // 'this references the EventEmitter 
    //instance where the listener is attached
})

myEmitter.on('eventAsync',  (a, b) => {
    setImmediate(() => {
        console.log(a,b, 'This happens asynchronously')
    })
})
let m = 0;

myEmitter.once('eventOnce',  (a, b) => {
    //It just runs once
    // .prependOnceListener Adds the onetime listener to de beginning of the listeners array
    m++
    console.log('I just run Once. Count '+m )
})

process.on('uncaughtException', (err) => {
    // This listener will fire as a guard for a nodejs crash.
    //Also. This listener will fire if there's not an 'error' listener attached to the eventEmitter
    console.error('An uncaught error occurred ...')
})

//Best practice for eventEmitters
myEmitter.on('error', (err) => {
    //If there's not a 'error' attached to the eventEmitter, 
    // when crashing stack trace is printed and nodejs process exits
   console.error('Yayyy ... I just caught exception on eventEmitter')
})


console.log(myEmitter.eventNames()); //Returns an array listing the events for which  the emitter has registered listeners

myEmitter.emit('eventFuncArgsArrow', 'a', 'b');
myEmitter.emit('eventAsync', 'f', 'g');
myEmitter.emit('event')
myEmitter.emit('eventFuncArgs', 'c', 'd');
myEmitter.emit('eventOnce', 'c', 'd'); //First try
myEmitter.emit('eventOnce', 'c', 'd'); //Second try
myEmitter.emit('error', new Error('WTF IS HAPPENING')); 