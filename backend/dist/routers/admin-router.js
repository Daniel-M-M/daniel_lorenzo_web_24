"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postsController = __importStar(require("../controllers/admin-controller"));
const router = (0, express_1.Router)();
router.post("/api/prestazione/create", postsController.createPrestazione);
router.put("/api/prestazione/update/:id", postsController.updatePrestazione);
router.delete("/api/prestazione/delete/:id", postsController.cancellaPrestazione);
router.post("/api/doctor/create", postsController.createDoctors);
router.put("/api/doctor/update/:id", postsController.updateDoctors);
router.delete("/api/doctor/delete/:id", postsController.cancellaDottore);
router.get("/api/prestazione/view/:id", postsController.getPrestazionePerDottore);
exports.default = router;
