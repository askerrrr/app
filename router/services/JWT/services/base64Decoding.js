export default async function base64Decoding(base64) {
  return Buffer.from(base64, "base64").toString("utf-8");
}
