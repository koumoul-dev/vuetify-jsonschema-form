#!/bin/bash
./stop.sh
./clean.sh
cd ..
docker build $1 -f docker/Dockerfile --target dev -t localhost/vjsf_dev .
cd docker
