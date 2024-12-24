import { getBarCharts, getDashBoardStats, getLineCharts, getPieCharts } from "../controllers/stats.controllers.js";
import { adminOnly } from "../middlerware/auth.middleware.js";
import { Router } from "express";






const router = Router()

router.route("/stats").get(getDashBoardStats)
router.route("/line").get(getLineCharts)
router.route("/pie").get(getPieCharts)
router.route("/bar").get(getBarCharts)




export default router