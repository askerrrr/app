export default async function base64Encoding(str) {
  return Buffer.from(JSON.stringify(str)).toString("base64");
}
