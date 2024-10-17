import deleteOrder from "../../../deleteOrder.js";

async function buttonForDeleteOrder(userId, fileId) {
  const orderList = `/orderinfo/orders/${userId}`;

  const button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить");

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const table = document.getElementById("table");
    const tbody = document.getElementById(fileId);
    table.removeChild(tbody);
    alert("Заказ был удален!");
    window.location.href = orderList;
    return deleteOrder(userId, fileId);
  });

  const form = document.createElement("form");
  form.action = `/orderinfo/delete/${userId}/${fileId}`;
  form.append(button);

  const tdButton = document.createElement("td");
  tdButton.append(form);
  return tdButton;
}

export default buttonForDeleteOrder;
