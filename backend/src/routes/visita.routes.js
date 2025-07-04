"use strict";
import { Router } from "express";
import { isAdmin } from "../middlewares/authorization.middleware.js";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";
import {
    createVisita,
    deleteVisita,
    getVisitas,
    updateVisita,
} from "../controllers/visita.controller.js";

const router = Router();

router.use(authenticateJwt).use(isAdmin);

router.get("/", getVisitas);

router.post("/", createVisita);

router.patch("/:id_visita", updateVisita);

router.delete("/:id_visita", deleteVisita);

export default router;
