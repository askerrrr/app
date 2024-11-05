export default async function base64UrlDecoding(base64) {
  const padding = (4 - (str.length % 4)) % 4;
  const paddedStr = str + "=".repeat(padding);

  return Buffer.from(
    paddedStr.replace(/-/g, "+").replace(/_/g, "/"),
    "base64"
  ).toString("utf-8");
}
