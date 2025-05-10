import { Router } from "express";

import {
  getShows,
  insertShow,
  upsertShow,
  getShow,
  deleteShow,
} from "../controllers/show-controller.js";

const router = Router();

router.route("/").get(getShows).post(insertShow).put(upsertShow);

router.route("/:id").get(getShow).delete(deleteShow);

export default router;
