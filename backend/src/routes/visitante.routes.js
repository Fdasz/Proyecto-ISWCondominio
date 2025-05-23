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

router.get("/", getVisitantes);

router.get("/detail", getVisitante);

router.post("/", createVisitante);

router.patch("/:id_visitante", updateVisitante);

router.delete("/:id_visitante", deleteVisitante);

export default router;