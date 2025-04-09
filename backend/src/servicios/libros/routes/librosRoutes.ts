import express from "express";
import {
  agregarLibro,
  listarLibros,
  obtenerLibro,
  actualizarLibro,
  eliminarLibro,
  obtenerCategorias,
} from "../controllers/librosController";

const router = express.Router();

// Endpoints
router.post("/", agregarLibro); // POST /libros
router.get("/", listarLibros); // GET /libros
router.get("/categorias", obtenerCategorias);
router.get("/:id", obtenerLibro); // GET /libros/{id}
router.put("/:id", actualizarLibro); // PUT /libros/{id}
router.delete("/:id", eliminarLibro); // DELETE /libros/{id}

export default router;
