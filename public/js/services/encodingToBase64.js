function encodingToBase64(json) {
  const base64 = Buffer.from(json, "base64");

  return base64;
}

export { encodingToBase64 };
