import JWT from "jsonwebtoken";
import env from "../../../env_var.js";

export default async function verifyToken(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.redirect("/auth/login");
    }

    const user = JWT.verify(token, env.secretKey);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/auth/login");
  }
}
