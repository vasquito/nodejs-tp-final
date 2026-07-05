import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productsRouter from "./routes/products.routes.js";
import authRouter from "./routes/auth.routes.js";
import errorHandler from "./handlers/error.handler.js";
import { swaggerSpec, swaggerUiMiddleware } from "./config/swagger.js";


dotenv.config(); // Carga variables desde .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors()); // habilita CORS
app.use(bodyParser.json()); // interpreta JSON en body

// Swagger UI
app.use("/docs", swaggerUiMiddleware.serve, swaggerUiMiddleware.setup(swaggerSpec));

// Rutas principales
app.use("/api", productsRouter);
app.use("/api/auth", authRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.send(`
    <h1>Tp Final</h1>
    <p>Servidor Node.js con Express funcionando correctamente 🚀🚀🚀</p>
    <p>Ver la documentación de la API en 
      <a href="/docs" target="_blank">Swagger UI</a>
    </p>
  `);
});

// Health check
app.get("/up", (req, res) => {
  res.json({ status: "ok", message: "Servidor activo" });
});

// Middleware para rutas desconocidas (404)
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});


// Middleware global de errores (¡siempre al final!)
app.use(errorHandler);

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
