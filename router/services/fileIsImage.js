function fileIsImage(file) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(file);
}

export default fileIsImage;
