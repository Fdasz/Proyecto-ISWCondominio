"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import residenteRoutes from "./residente.routes.js";
import visitanteRoutes from "./visitante.routes.js";
import visitaRoutes from "./visita.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/residentes", residenteRoutes)
    .use("/visitantes", visitanteRoutes)
    .use("/visitas", visitaRoutes);

export default router;