import { adminOnly } from "../middlerware/auth.middleware.js";






const router = Router()

router.route("/new").get(newOrder)



export default router