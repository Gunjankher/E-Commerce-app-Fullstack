import { getBarCharts, getDashBoardStats, getLineCharts, getPieCharts } from "../controllers/stats.controllers.js";
import { adminOnly } from "../middlerware/auth.middleware.js";
import { Router } from "express";






const router = Router()

router.route("/stats").get(adminOnly,getDashBoardStats)
router.route("/line").get(adminOnly,getLineCharts)
router.route("/pie").get(adminOnly,getPieCharts)
router.route("/bar").get(adminOnly,getBarCharts)




export default router