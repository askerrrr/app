import { env } from "../../env_var";

function checkAuthToken(authHeader) {
  const authToken = env.auth_token;

  return authHeader && authHeader.split(" ")[1] === `${authToken}`
    ? true
    : false;
}

export default checkAuthToken;
