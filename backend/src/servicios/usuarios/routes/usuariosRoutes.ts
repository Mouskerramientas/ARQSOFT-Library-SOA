import express from "express";
import {
  createUser,
  loginUser,
  validateToken,
} from "../controllers/usuariosControllers";

const router = express.Router();

// Endpoints

router.post("/register", createUser); // POST /usuarios/register
router.post("/login", loginUser); // POST /usuarios/login
router.get("/token", validateToken); // GET /usuarios/token

export default router;
