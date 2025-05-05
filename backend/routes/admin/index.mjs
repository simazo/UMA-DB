import express from 'express';
import cryptidRoutes from "./cryptidRoutes.mjs"

const router = express.Router();

router.use('/cryptids', cryptidRoutes);

export default router;
