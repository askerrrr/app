import crypto from "crypto";
import env from "../../../env_var.js";
import createNewJWT from "./services/createNewJWT.js";
import base64UrlEncoding from "./services/base64UrlEncoding.js";
import base64UrlDecoding from "./services/base64UrlDecoding.js";

export default async function JWT(authToken, login) {
  if (!authToken || authToken.split(".").length !== 3) {
    const header = {
      alg: "HS256",
      typ: "JWT",
    };

    const payload = { login };

    const sigrature = crypto
      .createHmac("SHA256", env.secretKey)
      .update(`${base64UrlEncoding(header)}.${base64UrlEncoding(payload)}`)
      .digest("base64");

    const token = `${header}.${payload}.${sigrature}`;
    console.log("token", token);
    return res.status(200).json({ token });
  }

  const [header, payload, sigrature] = authToken.split(".");

  const decodedHeaders = await base64UrlDecoding(header);
  const decodedPayload = await base64UrlDecoding(payload);

  const alg = decodedHeaders.alg;

  const expectedSignature = crypto
    .createHmac(`${alg}`, env.secretKey)
    .update(`${header}.${payload}`)
    .digest("base64");

  if (expectedSignature === sigrature) {
    console.log(authToken);
    return res.status(200).json({ token: authToken });
  }
  return res.status(403).json("Ты кто такой блять...");
}
