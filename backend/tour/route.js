import { Router } from "express";
import {
 getTours,
 getTourById,
 createTour,
 updateTour,
 deleteTour,
 getToursByCity,
 getPopularTours,
} from "./controller.js";
import { verifyToken } from "../common/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", getTours);
router.get("/popular", getPopularTours);
router.get("/city/:city", getToursByCity);
router.get("/:id", getTourById);

// Protected routes (require authentication)
router.post("/", verifyToken, createTour);
router.put("/:id", verifyToken, updateTour);
router.delete("/:id", verifyToken, deleteTour);

export default router;
