import crypto from "crypto";
import env from "../../../env_var.js";

import base64Encoding from "./services/base64Encoding.js";
import base64Decoding from "./services/base64Decoding.js";

export default async function JWT(authToken, login) {
  if (!authToken) {
    const headers = {
      alg: "HS256",
      typ: "JWT",
    };

    const payload = { login };

    const newToken = crypto
      .createHmac("SHA256", env.secretKey)
      .update(`${base64Encoding(headers)}.${base64Encoding(payload)}`)
      .digest("base64");

    return res.status(200).json({ login, newToken });
  }

  const [headers, payload, sigrature] = authToken.split(".");

  const expectedSignature = crypto
    .createHmac("SHA256", env.secretKey)
    .update(`${base64Encoding(headers)}.${base64Encoding(payload)}`)
    .digest("base64");

  if (expectedSignature === sigrature) {
    return res.status(200).json({ login, token });
  }
  return res.status(403);
}
