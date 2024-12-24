import { Router } from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.controllers.js";
import { adminOnly } from "../middlerware/auth.middleware.js";



const  router = Router()


router.route("/new").post(newUser)
router.route("/all").get(getAllUsers)
router.route("/:id").get(getUser)
router.route("/:id").delete(deleteUser)

export default router 