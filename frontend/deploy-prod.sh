echo "build..."
npm run build || true

## =========== 리눅스 미지원 ===========
# echo "For upload to docker Hub"
# docker build -t tomhoon/deploy-front:latest . || true

# echo "Uploading docker Hub"
# docker push tomhoon/deploy-front:latest || true
## =========== 리눅스 미지원 ===========

docker buildx build --platform linux/amd64,linux/arm64 -t tomhoon/deploy-front:latest --push .
