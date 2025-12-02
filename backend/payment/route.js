import { Router } from "express";
import {
 getMyPayments,
 getPaymentDetail,
 confirmPayment,
 cancelPayment,
} from "./controller.js";
import { verifyToken } from "../common/authMiddleware.js";

const router = Router();

router.get("/my", verifyToken, getMyPayments);
router.get("/:id", verifyToken, getPaymentDetail);
router.post("/toss/confirm", verifyToken, confirmPayment);
router.post("/toss/cancel", verifyToken, cancelPayment);

export default router;
