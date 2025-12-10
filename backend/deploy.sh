echo "stop docker container"
docker stop be-container || true

echo "remove docker container"
docker rm be-container || true

echo "make new image"
docker build -t be-image . || true

echo "make new container"
docker run -d -p 3000:3000 --name be-container --net hotel-net be-image || true