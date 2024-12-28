const combineData = async (data, image, items) => {
  var [url, qty, size] = data;
  var fileData = [];

  for (let i = 0; i < url.length; i++) {
    fileData.push({
      url: url[i],
      qty: qty[i],
      size: size[i],
      img: image[i],
      item: items[i],
    });
  }

  return fileData;
};

export default combineData;
