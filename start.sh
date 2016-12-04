#!/bin/bash

cd /home/pi/magic-mirror/

nohup node server.js

DISPLAY=:0 chromium-browser --kiosk http://localhost:3000/