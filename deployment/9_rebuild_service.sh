#!/usr/bin/env bash

echo ""
echo "****************************************"
echo "Rebuilding service >"$1"<..."

docker-compose stop $1
docker-compose rm -f $1
docker rmi "numerustextus_"$1
docker-compose build $1
docker-compose up -d $1

echo "Done!"
echo "****************************************"
echo ""
