export default function getProductLink(data) {
  const button = document.createElement("button");
  button.append("https://....");

  const link = document.createElement("a");
  link.href = data.order.url;
  link.target = "_blank";
  link.append(button);

  const url = document.createElement("td");
  url.append(link);
  return url;
}
