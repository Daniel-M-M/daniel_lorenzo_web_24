import { Router } from "express"
import * as postsController from "../controllers/admin-controller"

const router = Router()

router.post("/api/prestazione/create", postsController.createPrestazione)
router.put("/api/prestazione/update/:id", postsController.updatePrestazione)
router.delete("/api/prestazione/delete/:id", postsController.cancellaPrestazione)

router.post("/api/doctor/create", postsController.createDoctors)
router.put("/api/doctor/update/:id", postsController.updateDoctors)
router.delete("/api/doctor/delete/:id", postsController.cancellaDottore)

router.get("/api/prestazione/view/:id", postsController.getPrestazionePerDottore)

export default router