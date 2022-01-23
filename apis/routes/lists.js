import express from "express";
import listsController from "../controllers/listsController.js";
import verify from '../services/verifyToken.js';

const router = express.Router();

//UPDATE USER
router.post("/", verify, listsController.createList);
router.get("/", verify, listsController.allList);
// router.get("/random", verify, moviesController.randomMovie);
// router.get("/:id", verify, moviesController.getMovie);
// router.put("/:id", verify, moviesController.updateMovie);
router.delete("/:id", verify, listsController.deleteList);

export default router;
