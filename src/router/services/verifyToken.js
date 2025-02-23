import JWT from "jsonwebtoken";
import env from "../../env_var.js";

var verifyToken = async (req, res, next) => {
  try {
    var token = req.cookies?.token;

    if (!token) return res.redirect("/auth/login");

    var user = JWT.verify(token, env.secretKey);

    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/auth/login");
  }
};
export default verifyToken;
