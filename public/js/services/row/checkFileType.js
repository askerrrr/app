export default function checkFileType(file) {
  const image = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(file);
  const document = /\.(xlsx)$/.test(file);
  if (image) {
    return "it is image";
  } else if (document) {
    return "it is doc";
  } else {
    return "Тип файла не определен";
  }
}
