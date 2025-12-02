import { Router } from "express";
import {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
} from "./controller.js";
import { verifyToken } from "../common/authMiddleware.js";

const router = Router();

router.post("/", verifyToken, createReview);
router.get("/", getReviews);
router.put("/:reviewId", verifyToken, updateReview);
router.delete("/:reviewId", verifyToken, deleteReview);

export default router;
