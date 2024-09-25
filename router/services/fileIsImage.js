function fileIsImage(file) {
  const image = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(file);
  if (image) {
    return true;
  } else {
    return false;
  }
}
