const combineData = async (data, image, items, itemId) => {
  var [url, qty, size, totalSum, itemPrice] = data;
  var fileData = [];

  if (!itemId || !items) {
    return;
  }

  for (let i = 0; i < url.length; i++) {
    fileData.push({
      id: itemId[i],
      url: url[i],
      qty: qty[i],
      size: size[i],
      img: image[i],
      item: items[i],
      itemPrice: itemPrice[i],
      totalSum: totalSum[i],
    });
  }

  return fileData;
};

export default combineData;
