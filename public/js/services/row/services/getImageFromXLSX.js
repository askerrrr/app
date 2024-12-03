export default async (base64) => {
  var img = document.createElement("img");

  img.width = 250;
  img.height = 250;
  img.alt = "image";
  img.src = `data:image/png=;base64,${base64}`;

  var td = document.createElement("td");
  td.append(img);

  return td;
};
