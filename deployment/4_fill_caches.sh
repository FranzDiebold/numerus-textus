#!/usr/bin/env bash

###############################################

echo ""
echo "****************************************"
echo "Filling caches..."

docker-compose run --rm api sh fill_caches.sh

echo "Done!"
echo "****************************************"
echo ""