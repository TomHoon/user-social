import { Router } from "express";
import {
 listHotels,
 getHotelDetail,
 listRoomsByHotel,
 listRooms,
 getFeaturedHotels,
} from "./controller.js";
import { getReviews } from "../review/controller.js";

const router = Router();

router.get("/", listHotels);
router.get("/featured", getFeaturedHotels);
router.get("/rooms", listRooms);
router.get("/:id/rooms", listRoomsByHotel);
router.get("/:id/reviews", getReviews);
router.get("/:id", getHotelDetail);

export default router;
