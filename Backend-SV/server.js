const zmq = require("zeromq");
const fs = require("fs");
const WebSocket = require('ws');

const WS_PORT = process.env.WS_PORT || 3002;

const wsServer = new WebSocket.Server({ port: WS_PORT }, () => console.log(`WS server is listening at ws://localhost:${WS_PORT}`));
let connectedClients = [];

let image;

wsServer.on('connection', (ws, req) => {
    console.log('Some Client Connected');
    // add new connected client
    connectedClients.push(ws);
    //ws.send(image.toString());
        
});

async function run() {
  const sock = new zmq.Reply

  await sock.bind("tcp://162.243.167.183:3000")

  while(true){
  	let msg = await sock.receive();
  	sock.send('ACK1');
  	image = await sock.receive();
  	let buf = Buffer.from(image.toString(),'base64');
  	//fs.writeFile('test'+msg.toString()+'.jpg', buf, function(error){
  	//	if(error){
  	//		console.log(error)
  	//	}
  	//})
	wsServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
        client.send(image.toString());
      }
    });
  	sock.send('ACK2');
  	//fs.writeFile('test.jpg', image[0], 'binary', function(err) {
  	//	console.log(err)
  	//})
  }
}

run()