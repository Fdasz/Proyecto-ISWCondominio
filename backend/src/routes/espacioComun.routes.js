"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
  createEspacioComun,
  updateEspacioComun,
  removeEspacioComun,
  getEspacioComun
} from "../controllers/espacioComun.controller.js";

const router = Router();

router
  .use(authenticateJwt)
  .use(isAdmin);

router.get("/", getEspacioComun);

router.post("/", createEspacioComun);

router.patch("/:id_espacio", updateEspacioComun);

router.delete("/:id_espacio", removeEspacioComun);

export default router;