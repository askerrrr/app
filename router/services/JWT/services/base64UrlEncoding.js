export default async function base64UrlEncoding(str) {
  return Buffer.from(JSON.stringify(str))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
