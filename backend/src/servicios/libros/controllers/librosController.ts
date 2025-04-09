import { Request, Response } from "express";
import prisma from "../../../prisma";

// Agregar un nuevo libro
export const agregarLibro = async (req: Request, res: Response) => {
  const { titulo, autor, genero, precio, stock } = req.body;
  try {
    const libro = await prisma.libro.create({
      data: { titulo, autor, genero, precio, stock },
    });
    res.status(201).json(libro);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el libro" });
  }
};

// Listar todos los libros
export const listarLibros = async (req: Request, res: Response) => {
  try {
    const libros = await prisma.libro.findMany();
    res.status(200).json(libros);
  } catch (error) {
    res.status(500).json({ error: "Error al listar los libros" });
  }
};

// Obtener un libro por ID
export const obtenerLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const libro = await prisma.libro.findUnique({ where: { id: Number(id) } });
    if (!libro) {
      res.status(404).json({ error: "Libro no encontrado" });
      return;
    }
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el libro" });
  }
};

// Actualizar un libro por ID
export const actualizarLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, autor, genero, precio, stock } = req.body;
  try {
    const libro = await prisma.libro.update({
      where: { id: Number(id) },
      data: { titulo, autor, genero, precio, stock },
    });
    res.status(200).json(libro);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro" });
  }
};

// Eliminar un libro por ID
export const eliminarLibro = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.libro.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};

// Categorizar libros por género
export const obtenerCategorias = async (req: Request, res: Response) => {
  try {
    const categorias: string[] = [];
    const libros = await prisma.libro.findMany({
      select: {
        genero: true,
      },
    });
    for (const libro of libros) {
      if (!categorias.includes(libro.genero)) {
        categorias.push(libro.genero);
      }
    }
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: "Error al listar las categorias" });
  }
};