function decodingBase64(json) {
  const buf = Buffer.from(json);
  const base64 = buf.toString("base64");
  return base64;
}

module.exports = decodingBase64;
