import jwt from "jsonwebtoken";
import { decrypt } from "../lib/session.js";

export default async function authGuard(req, res, next) {
  try {
    // =========================
    // JWT TOKEN (React Native)
    // =========================
    const authHeader = req.headers.authorization;

    if (authHeader) {
      try {
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        return next();
      } catch (err) {
        return res.status(401).json({
          errors: ["Token inválido ou expirado."],
        });
      }
    }

    // =========================
    // COOKIE SESSION (WEB)
    // =========================
    const session = req.cookies.session;

    if (session) {
      const payload = await decrypt(session);

      if (!payload) {
        return res.status(401).json({
          errors: ["Sessão inválida ou expirada."],
        });
      }

      req.user = payload;

      return next();
    }

    // =========================
    // NÃO AUTENTICADO
    // =========================
    return res.status(401).json({
      errors: ["Usuário não autenticado."],
    });
  } catch (error) {
    console.error("Erro no middleware auth:", error);

    return res.status(500).json({
      errors: ["Erro interno do servidor."],
    });
  }
}
