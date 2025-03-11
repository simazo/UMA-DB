import express from "express";
import { requestErrorHandler } from "../helpers/request-handler.mjs";

import {
  getCryptids,
  getCryptidById,
  getCryptidCount,
} from "../controllers/cryptidController.mjs";

const router = express.Router();

router.get("/count", requestErrorHandler(getCryptidCount));

router.get("/:id", requestErrorHandler(getCryptidById));

router.get("/", requestErrorHandler(getCryptids));


export default router;