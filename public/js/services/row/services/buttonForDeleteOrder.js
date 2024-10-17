import deleteOrder from "../../../deleteOrder.js";

export default async function buttonForDeleteOrder(userId, fileId, orders) {
  const button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    const table = document.getElementById("table");

    const tbody = document.getElementById(fileId);

    table.removeChild(tbody);

    alert("Заказ был удален!");

    if (orders.length !== 1) {
      window.location.href = `/orderinfo/orders/${userId}`;
    }
    window.location.href = `/orderinfo/users`;
    return deleteOrder(userId, fileId);
  });

  const form = document.createElement("form");
  form.action = `/orderinfo/delete/${userId}/${fileId}`;
  form.append(button);

  const tdButton = document.createElement("td");
  tdButton.append(form);
  return tdButton;
}
