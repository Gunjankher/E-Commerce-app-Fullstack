import { Router } from "express";
import { adminOnly } from "../middlerware/auth.middleware.js";







const router = Router()

router.route("coupon/new").post(newOrder)


export default router