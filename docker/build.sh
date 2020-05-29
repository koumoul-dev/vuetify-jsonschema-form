#!/bin/bash
cd ..
rm -rf node_modules
rm -rf doc/dist
rm -rf doc/.nuxt
rm -rf doc/node_modules
docker build $1 -f docker/Dockerfile --target dev -t localhost/vjsf_dev .
cd docker
