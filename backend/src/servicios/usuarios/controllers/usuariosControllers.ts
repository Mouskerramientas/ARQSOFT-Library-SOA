import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import prisma from "../../../prisma";
import { encryptPassword, verifyPassword } from "../../../lib/auth/security";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, telefono, direccion } = req.body;

    if (!nombre || !email || !password || !telefono || !direccion) {
      return void res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await encryptPassword(password);

    const newUser = await prisma.user.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        telefono,
        direccion,
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return void res.status(400).json({ message: "Missing required fields" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return void res.status(401).json({ message: "Invalid credentials" });
    }

    // Aquí deberías verificar la contraseña con bcrypt
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return void res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, userType: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

export const validateToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return void res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET!, async (err, decoded) => {
      if (err) {
        return void res.status(401).json({ message: "Invalid token" });
      }

      const { userId, userType } = decoded as {
        userId: number;
        userType: string;
      };

      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ message: "Error validating token", error });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
