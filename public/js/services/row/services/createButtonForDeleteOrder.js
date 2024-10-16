import deleteOrder from "../../../deleteOrder.js";

async function createButtonForDeleteOrder(userId, fileId) {
  const button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить");

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    const table = document.getElementById("table");
    const tbody = document.getElementById(fileId);
    deleteOrder(userId, fileId);
    table.removeChild(tbody);
  });

  const form = document.createElement("form");
  form.action = `/orderinfo/delete/${userId}/${fileId}`;
  form.append(button);

  const tdButton = document.createElement("td");
  tdButton.append(form);
  return tdButton;
}

export default createButtonForDeleteOrder;
