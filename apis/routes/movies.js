import express from "express";
import moviesController from "../controllers/moviesController.js";
import verify from '../services/verifyToken.js';

const router = express.Router();

//UPDATE USER
router.post("/", verify, moviesController.createMovie);
router.get("/", verify, moviesController.allMovie);
router.get("/random", verify, moviesController.randomMovie);
router.get("/:id", verify, moviesController.getMovie);
router.put("/:id", verify, moviesController.updateMovie);
router.delete("/:id", verify, moviesController.deleteMovie);

export default router;
