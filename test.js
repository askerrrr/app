const arr = [];

const url = ["https://google.com", "https://youtube.com"];
const qty = ["24234", "44"];
const size = ["B", "C"];

function foo(url, qty, size) {
  for (let i = 0; i < url.length; i++) {
    arr.push({ url: url[i], qty: qty[i], size: size[i] });
  }
  return arr;
}

console.log(foo(url, qty, size));
