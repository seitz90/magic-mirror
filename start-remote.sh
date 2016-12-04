#!/bin/bash

# ssh pi@raspberrypi "cd /home/pi/magic-mirror/ && git pull && npm install && gulp build && DISPLAY=:0 npm start"

ssh pi@raspberrypi "cd /home/pi/magic-mirror/ && DISPLAY=:0 nohup node server.js && DISPLAY=:0 chromium-browser --kiosk http://localhost:3000/"
