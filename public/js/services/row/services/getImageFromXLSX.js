export default async (base64) => {
  var img = document.createElement("img");

  img.width = 200;
  img.height = 200;
  img.alt = "image";
  img.src = `data:image/png=;base64,${base64}`;

  var td = document.createElement("td");
  td.append(img);

  return td;
};
