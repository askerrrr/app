async function encodingToBase64(buffer) {
  try {
    const base64 = buffer.toString("base64");
    return base64;
  } catch (err) {
    console.log(`Ошибка при преобразовании в base64`, err);
  }
}

export { encodingToBase64 };



//decode base64 new Buffer(base64, 'base64').toString('utf-8')