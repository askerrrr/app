function checkFileType(file) {
  const image = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(file);
  const document = /\.(xlsx)$/.test(file);
  if (image) {
    return "it is image";
  } else if (document) {
    return "it is doc";
  }
}

console.log(
  checkFileType(
    "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9Ueu04NjTLGk/documents/file_27.xlsx"
  )
);
