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
import { authenticate } from "../common/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", getTours);
router.get("/popular", getPopularTours);
router.get("/city/:city", getToursByCity);
router.get("/:id", getTourById);

// Protected routes (require authentication)
router.post("/", authenticate, createTour);
router.put("/:id", authenticate, updateTour);
router.delete("/:id", authenticate, deleteTour);

export default router;
