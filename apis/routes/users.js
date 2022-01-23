import express from "express";
import userController from "../controllers/userController.js";
import verify from '../services/verifyToken.js';

const router = express.Router();

//UPDATE USER
router.get("/", verify, userController.allUser);
router.get("/stats", verify, userController.statsUser);
router.get("/:id", verify, userController.getUser);
router.put("/:id", verify, userController.updateUser);
router.delete("/:id", verify, userController.deleteUser);

export default router;
