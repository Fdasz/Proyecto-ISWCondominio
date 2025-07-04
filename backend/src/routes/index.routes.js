"use strict";
import { Router } from "express";
import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import visitanteRoutes from "./visitante.routes.js";
import visitaRoutes from "./visita.routes.js";
import espacioComunRoutes from "./espacioComun.routes.js";
import reservaEspacioRoutes from "./reservaEspacio.routes.js";

const router = Router();

router
    .use("/auth", authRoutes)
    .use("/user", userRoutes)
    .use("/visitantes", visitanteRoutes)
    .use("/visitas", visitaRoutes)
    .use("/espaciosComunes", espacioComunRoutes)
    .use("/reservasEspacio", reservaEspacioRoutes);

export default router;