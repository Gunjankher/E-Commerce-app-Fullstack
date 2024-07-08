import { Router } from "express";
import { newUser } from "../controllers/user.controllers.js";


const  router = Router()


router.route("/register").post(newUser)

export default router