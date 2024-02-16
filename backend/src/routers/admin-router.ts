import { Router } from "express"
import * as postsController from "../controllers/admin-controller"

const router = Router()

router.post("/api/prestazione/", postsController.createPrestazione)
router.put("/api/prestazione/:id", postsController.updatePrestazione)
router.delete("/api/prestazione/:id", postsController.cancellaPrestazione)

router.post("/api/doctor/", postsController.createDoctors)
router.put("/api/doctor/:id", postsController.updateDoctors)
router.delete("/api/doctor/:id", postsController.cancellaDottore)

router.get("/api/prestazione/:id", postsController.getPrestazionePerDottore)

export default router