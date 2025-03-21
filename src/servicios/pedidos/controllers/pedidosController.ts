import { Request, Response } from "express";
import prisma from "../../../prisma";

// Crear un nuevo pedido
export const crearPedido = async (req: Request, res: Response) => {
  const { clienteId, libroId, cantidad, estado } = req.body;

  try {
    // Verificar si el cliente existe
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(clienteId) },
    });
    if (!cliente) {
      return void res.status(400).json({ error: "Cliente no encontrado" });
    }

    // Verificar si el libro existe
    const libro = await prisma.libro.findUnique({
      where: { id: Number(libroId) },
    });
    if (!libro) {
      return void res.status(400).json({ error: "Libro no encontrado" });
    }

    // Verificar si hay suficiente stock
    if (libro.stock < cantidad) {
      return void res
        .status(400)
        .json({ error: "No hay suficiente stock disponible" });
    }

    // Crear el pedido
    const pedido = await prisma.pedido.create({
      data: {
        clienteId: Number(clienteId),
        libroId: Number(libroId),
        cantidad,
        estado,
      },
    });

    // Actualizar el stock del libro
    await prisma.libro.update({
      where: { id: Number(libroId) },
      data: { stock: libro.stock - cantidad },
    });

    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el pedido" });
  }
};

// Listar todos los pedidos
export const listarPedidos = async (req: Request, res: Response) => {
  try {
    const pedidos = await prisma.pedido.findMany();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar los pedidos" });
  }
};

// Obtener un pedido por ID
export const obtenerPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pedido = await prisma.pedido.findUnique({
      where: { id: Number(id) },
    });
    if (!pedido) {
      res.status(404).json({ error: "Pedido no encontrado" });
      return;
    }
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el pedido" });
  }
};

// Actualizar el estado de un pedido
export const actualizarPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: { estado },
    });
    res.status(200).json(pedido);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
};

// Cancelar un pedido
export const cancelarPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.pedido.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error al cancelar el pedido" });
  }
};
