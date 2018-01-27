#!/usr/bin/env bash

echo ""
echo "****************************************"
echo "Stopping Docker containers..."

docker-compose stop

echo "Done!"
echo "****************************************"
echo ""

###############################################

echo ""
echo "****************************************"
echo "Removing Docker containers, unused images and unused volumes..."

docker-compose rm -f

# remove all unused "<none>" images
docker rmi $(docker images -f "dangling=true" -q)

# remove all unused volumes
docker volume rm $(docker volume ls -qf dangling=true)

echo "Done!"
echo "****************************************"
echo ""
