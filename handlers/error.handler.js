const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.message === "Producto no encontrado") {
    return res.status(404).json({ error: err.message });
  }

  // Error genérico
  res.status(500).json({ error: "Error interno del servidor" });
};

export default errorHandler;