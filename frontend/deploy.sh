echo "stop docker container"
docker stop fe-container || true

echo "remove docker container"
docker rm fe-container || true

echo "build project"
npm run build || true

echo "make new image"
docker build -t fe-image . || true

echo "make new container"
docker run -d -p 880:80 --name fe-container --net hotel-net fe-image || true

