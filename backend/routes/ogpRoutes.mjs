import express from "express";
import { requestErrorHandler } from "../helpers/request-handler.mjs";
import { getCryptidOgp } from "../controllers/ogpController.mjs";

const router = express.Router();

router.get("/:id", requestErrorHandler(getCryptidOgp));

export default router;