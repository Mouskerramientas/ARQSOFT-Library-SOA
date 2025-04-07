import express from "express";
import {
  registrarCliente,
  listarClientes,
  obtenerCliente,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/clientesController";

const router = express.Router();

// Endpoints
router.post("/", registrarCliente); // POST /clientes
router.get("/", listarClientes); // GET /clientes
router.get("/:id", obtenerCliente); // GET /clientes/{id}
router.put("/:id", actualizarCliente); // PUT /clientes/{id}
router.delete("/:id", eliminarCliente); // DELETE /clientes/{id}

export default router;
