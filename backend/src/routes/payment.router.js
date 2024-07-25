import { Router } from "express";
import { adminOnly } from "../middlerware/auth.middleware.js";
import { applyDiscount, newCoupon } from "../controllers/coupon.controllers.js";







const router = Router()

router.route("/coupon/new").post(newCoupon)
router.route("/discount").get(applyDiscount)
router.route("/all").get(applyDiscount)



export default router