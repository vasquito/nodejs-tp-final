import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productsRouter from "./routes/products.routes.js";
import authRouter from "./routes/auth.routes.js";
import errorHandler from "./handlers/error.handler.js";

import { swaggerSpec } from "./config/swagger.js"; 
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config(); // Carga variables desde .env

const app = express();

// Middleware global
app.use(cors()); // habilita CORS
app.use(bodyParser.json()); // interpreta JSON en body


// Rutas principales
app.use("/api", productsRouter);
app.use("/api/auth", authRouter);

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// 👇 Servir los archivos estáticos de Swagger UI
app.use("/docs", express.static(path.join(__dirname, "node_modules/swagger-ui-dist")));


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

// Inicio del servidor (vercel)
export default app;