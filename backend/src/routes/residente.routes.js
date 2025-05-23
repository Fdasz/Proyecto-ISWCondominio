"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createResidente,
  deleteResidente,
  getResidente,
  getResidentes,
  updateResidente
} from "../controllers/residente.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

// List/filter residentes (GET /api/residentes?rut_residente=...&nombre_residente=...)
router.get("/", getResidentes);

// Get a single residente (by id, rut, or email as query param)
router.get("/detail", getResidente);

// Create residente
router.post("/", createResidente);

// Update residente by id (path param)
router.patch("/:id_residente", updateResidente);
// Update residente by rut (query param)
router.patch("/", updateResidente);

// Delete residente by id (path param)
router.delete("/:id_residente", deleteResidente);
// Delete residente by rut (query param)
router.delete("/", deleteResidente);

export default router;