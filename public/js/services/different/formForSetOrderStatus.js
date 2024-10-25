async function removeFieldset() {
  const fieldset = document.getElementById("fieldset");

  return fieldset.remove();
}

export default async function formForSetOrderStatus(userId, fileId) {
  const button = document.getElementById("submit-order-status");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    let checkBox = document.querySelector("input[name=order-status]:checked");

    if (!checkBox) {
      console.log(typeof orderStatus);
      alert("Вы ничего не выбрали");
    } else {
      const idOfMarkedCheckBox = checkBox.id;
      const orderStatus = checkBox.value + ":" + idOfMarkedCheckBox;

      console.log(orderStatus);
      const response = await fetch(
        `/status/${userId}/${fileId}/${orderStatus}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
        }
      );

      if (!response.ok) {
        console.log("Error when sending data...");
        await removeFieldset();
      } else {
        await removeFieldset();
        window.dialog.close();
        window.location.reload();
      }
    }
  });
  return button;
}

function closePopUp() {
  const button = document.getElementById("close-dialog");
  button.addEventListener("click", async (e) => {
    e.preventDefault();
    await removeFieldset();
    window.dialog.close();
  });
}

closePopUp();
