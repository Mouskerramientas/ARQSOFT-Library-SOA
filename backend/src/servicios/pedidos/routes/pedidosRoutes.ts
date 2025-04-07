import express from "express";
import {
  crearPedido,
  listarPedidos,
  obtenerPedido,
  actualizarPedido,
  cancelarPedido,
} from "../controllers/pedidosController";

const router = express.Router();

// Endpoints
router.post("/", crearPedido); // POST /pedidos
router.get("/", listarPedidos); // GET /pedidos
router.get("/:id", obtenerPedido); // GET /pedidos/{id}
router.put("/:id", actualizarPedido); // PUT /pedidos/{id}
router.delete("/:id", cancelarPedido); // DELETE /pedidos/{id}

export default router;
