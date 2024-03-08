import { Router } from "express"
import * as adminController from "../controllers/admin-controller"

const router = Router()

router.post("/api/prestazione/", adminController.createPrestazione)
router.put("/api/prestazione/:id", adminController.updatePrestazione)
router.delete("/api/prestazione/:id", adminController.cancellaPrestazione)

router.post("/api/doctor/", adminController.createDoctors)
router.put("/api/doctor/:id", adminController.updateDoctors)
router.delete("/api/doctor/:id", adminController.cancellaDottore)

router.get("/api/prestazione/:id", adminController.getPrestazionePerDottore)

export default router