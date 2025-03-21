import express from "express";
import middlewares from "./middlewares";
import librosRoutes from "./servicios/libros/routes/librosRoutes";
import clientesRoutes from "./servicios/clientes/routes/clientesRoutes";
import pedidosRoutes from "./servicios/pedidos/routes/pedidosRoutes";

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
middlewares(app);

// Rutas
app.use("/libros", librosRoutes);
app.use("/clientes", clientesRoutes);
app.use("/pedidos", pedidosRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json("API de la librería funcionando");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
