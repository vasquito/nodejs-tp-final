import * as productModel from "../models/products.model.js";

export const getAllProducts = async () => {
    return await productModel.getAllProducts();
};

export const getProduct = async (id) => {
    const product = await productModel.getProductByProductId(id);
    if (!product) {
        throw new Error("Producto no encontrado");
    }
    return product;
};

export const createProduct = async (data) => {
    return await productModel.createProduct(data)
};

export const deleteProduct = async (id) => {
    await productModel.deleteProduct(id);
    return true;
};

