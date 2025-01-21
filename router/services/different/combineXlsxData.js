const combineData = async (data, image, items, itemId) => {
  var [url, qty, size, totalSum, priceOfEach] = data;
  var fileData = [];

  for (let i = 0; i < url.length; i++) {
    fileData.push({
      id: itemId[i],
      url: url[i],
      qty: qty[i],
      size: size[i],
      img: image[i],
      item: items[i],
      priceOfEach: priceOfEach[i],
      totalSum: totalSum[i],
    });
  }

  return fileData;
};

export default combineData;
