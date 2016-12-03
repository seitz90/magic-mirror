#!/bin/bash

ssh pi@raspberrypi "cd /home/pi/magic-mirror/ && git pull && npm install && gulp build && DISPLAY=:0 npm start"
