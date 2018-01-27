#!/usr/bin/env bash

###############################################

echo ""
echo "****************************************"
echo "Migrating database and loading initial data..."

docker-compose run --rm api sh migrate_and_load.sh

echo "Done!"
echo "****************************************"
echo ""