import * as authService from "../services/auth.service.js";

export const login = (req, res) => {
  const { username, password } = req.body;
  try {
    const token = authService.login(username, password);
    res.json({ token: `Bearer ${token}` });
  } catch (err) {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};
