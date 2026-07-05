import * as productService from "../services/products.service.js";

let products = [];
let currentId = 0;

export const getProducts = async (req, res, next) => {
  try {
    const {category} = req.query;
    const products = await productService.getAllProducts();
    if (category) {
        const filteredProducts = products.filter((product) => 
            product.category === category
        );
        res.json(filteredProducts);
        return;
    } 
    res.json(products);
  } catch (error) {
    console.error(`Se ha producido un error en getProducts:`, error);
    next(new Error(`Se ha producido un error en getProducts`));
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const productId = Number(req.params.id);
    const product = await productService.getProduct(productId);
    if (!product) {
      return next(new Error("Producto no encontrado"));
    }
    res.json(product);
  } catch (error) {
    console.error(`Se ha producido un error en getProductById:`, error);
    if (error.message === "Producto no encontrado") {
      return next(new Error("Producto no encontrado"));
    }
    next(new Error(`Se ha producido un error en getProductById`));
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const { name, price, categories } = req.body;
    if (!name || !price || !categories) {
        return next(new Error("Faltan campos requeridos"));
    }
    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(`Se ha producido un error en createProduct:`, error);
    next(new Error(`Se ha producido un error en createProduct`));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.id);
    res.json({ message: `Producto ${req.params.id} eliminado` });
  } catch (error) {
    console.error(`Se ha producido un error en deleteProduct:`, error);
    if (error.message === "Producto no encontrado") {
      return next(new Error("Producto no encontrado"));
    }
    next(new Error(`Se ha producido un error en deleteProduct`));
  }
};
