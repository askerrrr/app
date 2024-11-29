export default async function renderTableHead(orders) {
  const phone = document.createElement("th");
  phone.append("Телефон");

  const photo = document.createElement("th");
  photo.append("Изображение");

  const orderFile = document.createElement("th");
  orderFile.append("Файл");

  const orderId = document.createElement("th");
  orderId.append("ID заказа");

  const orderDate = document.createElement("th");
  orderDate.append("Заказ от");

  const description = document.createElement("th");
  description.append("Описание");

  const status = document.createElement("th");
  status.append("Текущий статус");

  const itemUrl = document.createElement("th");
  itemUrl.append("Ссылка на товар");

  const thead = document.getElementById("thead");

  const tr = document.createElement("tr");

  if (orders.order?.type) {
    tr.append(
      orderId,
      orderDate,
      phone,
      photo,
      itemUrl,
      description,
      status,
      orderFile
    );

    thead.append(tr);
    return thead;
  }

  tr.append(orderId, orderDate, orderFile, phone, status);
  thead.append(tr);

  return thead;
}
