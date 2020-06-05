#!/bin/bash
./stop.sh
./clean.sh

docker-compose -f docker-compose.yml up --remove-orphans
