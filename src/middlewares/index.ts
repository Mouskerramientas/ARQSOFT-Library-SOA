import express from "express";
import cors from "cors";

const middlewares = (app: express.Application) => {
  app.use(express.json()); // Para parsear el cuerpo de las solicitudes a JSON
  app.use(cors()); // Para habilitar CORS
};

export default middlewares;
