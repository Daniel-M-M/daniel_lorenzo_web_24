import { Router } from "express"
import * as postsController from "../controllers/booking-controller"

const router = Router()

router.get("/api/allprenotations", postsController.getMyBooking)
router.post("/api/prenotation", postsController.checkBooking)
router.delete("/api/prenotation/:id", postsController.deleteBooking)

export default router