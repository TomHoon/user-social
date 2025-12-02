import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  applyBusiness,
  getBusinessStatus,
} from "./controller.js";
import { verifyToken } from "../common/authMiddleware.js";

const router = Router();

// 프로필 관련
router.get("/profile", verifyToken, getUserProfile);
router.put("/password", verifyToken, changePassword);

// 사업자 관련 (동적 라우트보다 먼저)
router.post("/business-apply", verifyToken, applyBusiness);
router.get("/business-status", verifyToken, getBusinessStatus);

// 동적 라우트는 마지막에
router.get("/:id", verifyToken, getUserProfile);
router.put("/:id", verifyToken, updateUserProfile);

export default router;
