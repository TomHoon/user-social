import { Hotel } from "./model.js";
import { Room } from "../room/model.js";
import { Review } from "../review/model.js";
import * as roomService from "../room/service.js";

export const listHotels = async ({ city, guests, type, freebies }) => {
 const query = { status: "approved" };
 if (city) query.city = city;
 if (type) query.type = type;

 // freebies 필터링 (쉼표로 구분된 문자열을 배열로 변환)
 if (freebies) {
  const freebiesArray =
   typeof freebies === "string" ? freebies.split(",") : freebies;
  freebiesArray.forEach((freebie) => {
   const trimmedFreebie = freebie.trim();
   if (trimmedFreebie === "breakfast") query["freebies.breakfast"] = true;
   if (trimmedFreebie === "airportPickup")
    query["freebies.airportPickup"] = true;
   if (trimmedFreebie === "wifi") query["freebies.wifi"] = true;
   if (trimmedFreebie === "customerSupport")
    query["freebies.customerSupport"] = true;
  });
 }

 // guests 필터는 객실이 있는 호텔만 표시하므로 일단 비활성화
 // if (guests) {
 //  const rooms = await Room.find({
 //   capacity: { $gte: Number(guests) },
 //   status: "active",
 //  }).distinct("hotel");
 //  query._id = { $in: rooms };
 // }

 return Hotel.find(query).sort({ createdAt: -1 });
};

export const getHotelDetail = async (id) => {
 const hotel = await Hotel.findById(id);
 if (!hotel) {
  const err = new Error("HOTEL_NOT_FOUND");
  err.statusCode = 404;
  throw err;
 }

 const rooms = await roomService.getRoomsByHotel(id);
 const reviews = await Review.find({ hotelId: id })
  .populate("userId", "name")
  .sort({ createdAt: -1 });

 return { hotel, rooms, reviews };
};

export const listRoomsByHotel = async (id) => {
 return roomService.getRoomsByHotel(id);
};

export const getFeaturedHotels = async (limit = 10) => {
 return Hotel.find({ status: "approved", featured: true })
  .sort({ ratingAverage: -1, ratingCount: -1 })
  .limit(limit)
  .lean();
};
