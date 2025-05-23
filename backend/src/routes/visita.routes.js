"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createVisita,
  deleteVisita,
  getVisitas,
  updateVisita
} from "../controllers/visita.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

// List/filter visitas (GET /api/visitas?rut_residente=...&fecha_visita=...)
router.get("/", getVisitas);

// Create visita (POST /api/visitas)
router.post("/", createVisita);

// Update visita (PATCH /api/visitas/:rut_visitante/:rut_residente/:fecha_visita)
router.patch("/:rut_visitante/:rut_residente/:fecha_visita", updateVisita);

// Delete visita (DELETE /api/visitas/:rut_visitante/:rut_residente/:fecha_visita)
router.delete("/:rut_visitante/:rut_residente/:fecha_visita", deleteVisita);

export default router;