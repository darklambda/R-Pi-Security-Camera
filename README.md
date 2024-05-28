## Running the Project

### Pre-requisites
* A Raspberry Pi (any version) with the Python packages zmq (ZeroMQ) and cv2 (OpenCV) installed, and the correspondent camera for it. 
* A different machine with Node installed.
* Both machines need to be connected to the same network.

### Main steps
* In the local server from the directory ``Backend-SV/``, run the commands ``npm install`` and ``$ node Backend-SV/server.js``. This will open two TCP entry sockets, one through the ZeroMQ for the consumption of images from the RaspberryPi (as an abstract stream in the port 3000), and one as a Websocket for the forwarding of the images to any client (in the port 3001). 
* In the Raspberry Pi, run the Python file ``RaspberryPi/client.py``. This will generate an outgoing ZeroMQ connection to the port 3000 of the local host, that will send images in Base64 format.

### Further process
Now, it can be possible to connect this architecture to any client through a Websocket to the Backend Server to send and decode the images in Base64 format. An example of this would be the snippet:
```
import { webSocket } from "rxjs/webSocket";

source: any;
subject = webSocket("ws://localhost:3001")
.subscribe((dataFromServer: any) => {
  this.source = String.fromCharCode(...new Uint8Array(dataFromServer)); 
});
```

