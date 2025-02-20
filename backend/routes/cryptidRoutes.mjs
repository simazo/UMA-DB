import express from "express";
import { requestErrorHandler } from "../helpers/request-handler.mjs";

import {
  getCryptids,
  getCryptidById,
} from "../controllers/cryptidController.mjs";

const router = express.Router();

router.get("/", requestErrorHandler(getCryptids));

router.get("/:id", requestErrorHandler(getCryptidById));

export default router;