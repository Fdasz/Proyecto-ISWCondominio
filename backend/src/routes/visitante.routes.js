"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createVisitante,
  deleteVisitante,
  getVisitante,
  getVisitantes,
  updateVisitante
} from "../controllers/visitante.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

// List/filter visitantes (GET /api/visitantes?rut_visitante=...&nombre_visitante=...)
router.get("/", getVisitantes);

// Get a single visitante (GET /api/visitantes/detail?rut_visitante=...&id_visitante=...)
router.get("/detail", getVisitante);

// Create visitante (POST /api/visitantes)
router.post("/", createVisitante);

// Update visitante (PATCH /api/visitantes/:id_visitante)
router.patch("/:id_visitante", updateVisitante);

// Delete visitante (DELETE /api/visitantes/:id_visitante)
router.delete("/:id_visitante", deleteVisitante);

export default router;