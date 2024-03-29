import { Router } from "express"
import * as postsController from "../controllers/booking-controller"

const router = Router()

router.post("/api/prenotation", postsController.createBooking)
router.delete("/api/prenotation/:id", postsController.deleteBooking)
router.get("/api/prenotation/", postsController.getAllBooking)
router.get("/api/doctor/get", postsController.getDoctors)
router.get("/api/prestazioni/get", postsController.getPrestazioni)
router.get("/api/utente/get", postsController.getUtenti)
export default router