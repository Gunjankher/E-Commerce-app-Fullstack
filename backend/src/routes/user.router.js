import { Router } from "express";
import { deleteUser, getAllUsers, getUser, newUser } from "../controllers/user.controllers.js";
import { adminOnly } from "../middlerware/auth.middleware.js";



const  router = Router()


router.route("/new").post(newUser)
router.route("/all").get(adminOnly,getAllUsers)
router.route("/:id").get(adminOnly,getUser)
router.route("/:id").delete(adminOnly,deleteUser)

export default router 