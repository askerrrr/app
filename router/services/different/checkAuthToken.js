import { env } from "../../../env_var.js";

function checkAuthToken(authHeader) {
  const authToken = env.auth_token;

  return authHeader && authHeader.split(" ")[1] === `${authToken}`
    ? true
    : false;
}

export default checkAuthToken;
