import { Request, Response } from "express";
import prisma from "../../../prisma";

// Registrar un nuevo cliente
export const registrarCliente = async (req: Request, res: Response) => {
  const { nombre, email, telefono, direccion } = req.body;
  try {
    const cliente = await prisma.cliente.create({
      data: { nombre, email, telefono, direccion },
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el cliente" });
  }
};

// Listar todos los clientes
export const listarClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: "Error al listar los clientes" });
  }
};

// Obtener un cliente por ID
export const obtenerCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });
    if (!cliente) {
      res.status(404).json({ error: "Cliente no encontrado" });
      return;
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el cliente" });
  }
};

// Actualizar un cliente por ID
export const actualizarCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion } = req.body;
  try {
    const cliente = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { nombre, email, telefono, direccion },
    });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el cliente" });
  }
};

// Eliminar un cliente por ID
export const eliminarCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.cliente.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el cliente" });
  }
};
