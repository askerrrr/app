export default async function formForSetOrderStatus(userId, fileId) {
  const button = document.createElement("button");
  button.className = "set-order-status";
  button.append("Изменить статут заказа");

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;
    return window.open(`/status/${userId}/${fileId}`, params);
  });

  const form = document.createElement("form");
  form.append(button);
  return form;
}
