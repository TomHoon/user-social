var u = db.users.findOne({ email: "hong@example.com" });
var reservations = db.reservations
  .find({ status: "completed" })
  .limit(6)
  .toArray();

db.reviews.insertMany([
  {
    userId: u._id,
    hotelId: ObjectId("6928ee9a7ba8c295639dc2a0"),
    reservationId: reservations[0]._id,
    rating: 5,
    comment:
      "롯데호텔 서울 정말 최고였어요! 명동 쇼핑하기도 편하고 객실도 넓고 깨끗했습니다. 조식도 맛있었어요.",
    images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400"],
    createdAt: new Date("2024-03-05T10:30:00.000Z"),
    updatedAt: new Date("2024-03-05T10:30:00.000Z"),
  },
  {
    userId: u._id,
    hotelId: ObjectId("6928ee9a7ba8c295639dc2a0"),
    reservationId: reservations[1]._id,
    rating: 4,
    comment:
      "위치가 정말 좋고 직원분들이 친절하세요. 다만 주말이라 사람이 많아서 조금 복잡했어요.",
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400",
    ],
    createdAt: new Date("2024-03-08T15:20:00.000Z"),
    updatedAt: new Date("2024-03-08T15:20:00.000Z"),
  },
  {
    userId: u._id,
    hotelId: ObjectId("6928ee9a7ba8c295639dc2a1"),
    reservationId: reservations[2]._id,
    rating: 5,
    comment:
      "해운대 그랜드 호텔 오션뷰 최고! 바다가 바로 보여서 너무 좋았어요. 수영장도 깨끗하고 서비스도 훌륭했습니다.",
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400",
    ],
    createdAt: new Date("2024-03-12T09:45:00.000Z"),
    updatedAt: new Date("2024-03-12T09:45:00.000Z"),
  },
  {
    userId: u._id,
    hotelId: ObjectId("6928ee9a7ba8c295639dc2a1"),
    reservationId: reservations[3]._id,
    rating: 4,
    comment:
      "가족여행으로 다녀왔는데 아이들이 정말 좋아했어요. 비치 클럽 시설이 훌륭합니다.",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
    ],
    createdAt: new Date("2024-03-15T11:30:00.000Z"),
    updatedAt: new Date("2024-03-15T11:30:00.000Z"),
  },
  {
    userId: u._id,
    hotelId: ObjectId("6928ee9a7ba8c295639dc2a2"),
    reservationId: reservations[4]._id,
    rating: 5,
    comment:
      "제주 신라호텔 완벽했습니다! 뷰가 정말 환상적이고 서비스도 최고예요. 특히 조식 뷔페가 인상적이었어요.",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400",
      "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=400",
    ],
    createdAt: new Date("2024-03-10T14:20:00.000Z"),
    updatedAt: new Date("2024-03-10T14:20:00.000Z"),
  },
  {
    userId: u._id,
    hotelId: ObjectId("6928ee9a7ba8c295639dc2a2"),
    reservationId: reservations[5]._id,
    rating: 5,
    comment:
      "허니문으로 다녀왔는데 정말 로맨틱했어요. 골프장도 좋고 스파도 최고였습니다. 강추합니다!",
    images: [
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400",
    ],
    createdAt: new Date("2024-03-18T16:50:00.000Z"),
    updatedAt: new Date("2024-03-18T16:50:00.000Z"),
  },
]);

print("Reviews inserted successfully!");
