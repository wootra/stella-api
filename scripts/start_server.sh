#!/bin/bash
cd /home/ec2-user/stella-api
export PORT=8080
export NODE_ENV=production
export SERVER_URL=18.223.92.250
export SERVER_PRIVATE_URL=172.31.35.53
forever start server.js
