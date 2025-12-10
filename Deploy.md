# 순서
1. 네트워크 생성
2. FE, BE 이미지 생성
3. MONGODB -> BE -> FE 순으로 컨테이너 올리기 

---

# 1. 네트워크 생성
```
docker network create hotel-net
```

# 1-1. 몽고디비 네트워크에 넣기
```
docker network connect hotel-net mongodb
```

# 2. 이미지생성
```
docker run build -t fe-image .
```

```
docker run build -t be-image .
```

# 3. 컨테이너 생성
```
[front]
docker run -d -p 80:80 --name fe-container --net hotel-net fe-image
```
```
[back]
docker run -d -p 3000:3000 --name express-container --net hotel-net be-image
```



