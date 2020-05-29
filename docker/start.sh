rm -rf ../node_modules
rm -rf ../doc/dist
rm -rf ../doc/.nuxt
rm -rf ../doc/node_modules

./stop.sh
docker-compose -f docker-compose.yml up --remove-orphans
