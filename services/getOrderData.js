function getOrderData(data) {
  let arr = [];
  for (let i in data) {
    arr.push(data[i]);
  }
  arr = arr[3];
  return arr[0];
}

module.exports = getOrderData
