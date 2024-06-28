/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from "express";
export const router = Router();
export const questionController = require("../controllers/questionController");

router.post("/", questionController.create);
router.get("/", questionController.getAll);
router.get("/:id", questionController.getOne);
router.delete("/:id", questionController.delete);
router.put("/:id", questionController.update);

module.exports = router;
