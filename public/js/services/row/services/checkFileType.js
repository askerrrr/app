function checkFileType(file) {
  const image = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(file);
  const document = file.startsWith("https://docs.google.com");
  if (image) {
    return "image";
  } else if (document) {
    return "https://docs.google.com";
  } else {
    return "Тип файла не определен";
  }
}

export default checkFileType;
