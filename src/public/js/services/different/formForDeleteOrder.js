import deleteOrder from "../../deleteOrder.js";

var createDeleteOrderForm = async (userId, orderId) => {
  var button = document.createElement("button");
  button.type = "submit";
  button.append("Удалить заказ");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmDeletion = confirm("Удалить заказ?");

    if (!confirmDeletion) {
      return;
    }

    var isDeletionSuccessful = await deleteOrder(userId, orderId);
    console.log(isDeletionSuccessful);

    if (isDeletionSuccessful) {
      alert("Заказ был удален!");

      var tbody = document.getElementById(orderId);
      var table = document.getElementById("table");
      table.removeChild(tbody);

      window.location.replace("/orderinfo/orders/" + userId);
      return;
    } else {
      alert("Не удалось удалить заказ");
      return;
    }
  });

  var form = document.createElement("form");
  form.action = "/orderinfo/delete/" + userId + "/" + orderId;
  form.className = "form-for-delete-order";
  form.append(button);

  return form;
};

export default createDeleteOrderForm;
