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

router.get("/", getResidentes);

router.get("/detail", getResidente);

router.post("/", createResidente);

router.patch("/:id_residente", updateResidente);

router.delete("/:id_residente", deleteResidente);


export default router;