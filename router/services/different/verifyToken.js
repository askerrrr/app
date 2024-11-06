import JWT from "jsonwebtoken";
import env from "../../../env_var.js";

export default async function verifyToken(req, res, next) {
  const token = req.cookies.token;
  try {
    const user = JWT.verify(token, env.secretKey);
    req.user = user;
    next();
  } catch (err) {
    res.crearCookie("token");
    return res.redirect("/auth/login");
  }
}

// try {
//   if (req.headers.authorization) {
//     const token = req.headers.authorization.split(" ");
//     if (token[0] === "Bearer" && JWT.verify(token[1], env.secretKey)) next();
//   }
//   return res.status(500);
// } catch (err) {
//   if (err.name === "JsonWebTokenError") res.sendStatus(401);
//   return res.sendStatus(401);
// }
