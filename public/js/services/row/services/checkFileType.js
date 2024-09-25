function checkFileType(file) {
  const image = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(file);
  const document = /\.(xlsx)$/.test(file);
  if (image) {
    return "image";
  } else if (document) {
    return "file.xlsx";
  } else {
    return "Тип файла не определен";
  }
}

export default checkFileType;
