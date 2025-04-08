import express from "express";
import middlewares from "./middlewares";
import multer from "multer";
import { promisify } from "util";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

import pedidosRoutes from "./servicios/pedidos/routes/pedidosRoutes";
import librosRoutes from "./servicios/libros/routes/librosRoutes";
import userRoutes from "./servicios/usuarios/routes/usuariosRoutes";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
middlewares(app);

const upload = multer({ dest: "uploads/" });
const unlinkAsync = promisify(fs.unlink);

// Rutas
app.use("/libros", librosRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/users", userRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json("API de la librería funcionando");
});

// Endpoint to receive file uploads
app.post("/upload-to-lambda", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const formData = new FormData();
    const fileStream = fs.createReadStream(req.file.path);
    formData.append("file", fileStream, { filename: req.file.originalname });
    formData.append("file", fileStream, req.file.originalname);

    console.log("File stream created:", fileStream);

    // Call Lambda via API Gateway
    const lambdaUrl =
      "https://dgmlwgbfj2.execute-api.us-east-1.amazonaws.com/default/Lambda-el-mancho";

    const response = await axios.post(lambdaUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Clean up the temporary file
    await unlinkAsync(req.file.path);

    res.json({
      status: "success",
      data: response.data,
    });
    return;
  } catch (error: any) {
    console.error("Error uploading file:", error);
    res.status(500).json({
      error: "Failed to upload file",
      details: error.message,
    });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
