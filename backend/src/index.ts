import express from "express";
import middlewares from "./middlewares";
import librosRoutes from "./servicios/libros/routes/librosRoutes";
import pedidosRoutes from "./servicios/pedidos/routes/pedidosRoutes";
import multer from "multer";
import { promisify } from "util";
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
middlewares(app);

const upload = multer({ dest: "uploads/" });
const unlinkAsync = promisify(fs.unlink);

// Rutas
app.use("/libros", librosRoutes);
app.use("/pedidos", pedidosRoutes);

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


// Obtener enlace de visualización de un archivo
app.get("/preview-file", async (req, res) => {
  try {
    const { file_name } = req.query;
    
    if (!file_name) {
      return void res.status(400).json({ error: "El parámetro 'file_name' es requerido" });
    }
    
    const lambdaUrl = `https://s6cq63bt8c.execute-api.us-east-1.amazonaws.com/default/Lambda-el-mancho-2?file_name=${encodeURIComponent(file_name as string)}`;
    
    const response = await axios.get(lambdaUrl);
    
    res.json({
      status: "success",
      data: response.data,
    });
  } catch (error: any) {
    console.error("Error al generar la URL de visualización:", error.message);
    res.status(500).json({
      error: "Error al generar la URL",
      details: error.message,
    });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});