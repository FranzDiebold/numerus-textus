#!/usr/bin/env bash

source deployment/aws_config.txt

echo ""
echo "****************************************"
echo "Building Docker containers..."

docker-compose build

echo "Done!"
echo "****************************************"
echo ""

###############################################

echo ""
echo "****************************************"
echo "Starting Docker containers..."

docker-compose up -d

echo "Done!"
echo "****************************************"
echo ""

###############################################

echo "IP address is:"
docker-machine ip $INSTANCE_NAME
echo ""
