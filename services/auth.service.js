import jwt from "jsonwebtoken";

export const login = (username, password) => {
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ user: username }, process.env.SECRET_KEY, {
      expiresIn: "1h"
    });
    return token;
  }
  throw new Error("Credenciales inválidas");
};
