"use strict"
import {
    createReservaEspacio,
    deleteReservaEspacio,
    getReservaEspacio,
    updateReservaEspacio
} from "../controllers/reservaEspacio.controller.js";
import { isAdmin} from "../middlewares/authorization.middleware.js";
import { Router} from "express";
import { authenticateJwt } from "../middlewares/authentication.middleware.js";

const router = Router();
router
    .use(authenticateJwt)
    .use(isAdmin);
    
router.get("/", getReservaEspacio);

router.post("/", createReservaEspacio);

router.put("/:id_reserva", updateReservaEspacio);

router.delete("/:id_reserva", deleteReservaEspacio);

export default router;