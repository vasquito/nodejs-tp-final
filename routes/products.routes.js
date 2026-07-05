import { Router } from "express";
import { verifyToken } from "../security/auth.middleware.js";
import * as productsController from "../controllers/products.controller.js";

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtiene todos los productos
 *     tags: [Products]  
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get("/products", verifyToken, productsController.getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtiene un producto por su productId
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/products/:id", verifyToken, productsController.getProductById);

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Manzana"
 *               price:
 *                 type: number
 *                 example: 1200
 *               categories: 
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["alimentos", "frutas"]
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error interno del servidor
 */
router.post("/products/create", verifyToken, productsController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Elimina un producto por su productId
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID incremental del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete("/products/:id", verifyToken, productsController.deleteProduct);

export default router;

