import { Router } from "express"
import * as authController from "../controllers/auth-controller"

const router = Router()

router.post("/api/auth/register", authController.register)
router.post("/api/auth/login", authController.login)
router.post("/api/auth/logout", authController.logout)
router.get("/api/auth/profile", authController.getProfile)

export default router