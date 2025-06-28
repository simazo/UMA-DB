import express from "express";
import cryptidRoutes from "./cryptidRoutes.mjs"
import ogpRoutes from "./ogpRoutes.mjs";

const router = express.Router();

router.use("/ogp", ogpRoutes);
router.use("/cryptids", cryptidRoutes);

export default router;


