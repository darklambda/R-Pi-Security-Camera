import zmq
import base64
import cv2


context = zmq.Context()
socket = context.socket(zmq.REQ)
socket.connect('tcp://localhost:3000')
print("Producer bound to port 3000")

camera = cv2.VideoCapture(0)  # init the camera
count = 0
while True:
	try:
		count+=1
		grabbed, frame = camera.read()
		frame = cv2.resize(frame, (640, 480))  # resize the frame
		encoded, buffer = cv2.imencode('.jpg', frame)
		socket.send_string('1') #name of the camera
		resp2 = socket.recv()
		socket.send(base64.b64encode(buffer))
		resp2 = socket.recv()
		if count%500 == 0:
			count = 0
			print("Sending images")
	except:
		camera.release()
		break