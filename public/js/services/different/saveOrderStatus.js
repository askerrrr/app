function renderUnmarkedCheckBoxForFirstStatus(array) {
  return array
    .slice(1)
    .map((elem) => (document.getElementById(elem.statusId).disabled = true));
}

function renderNextUnmarkedPendingStatus(array, statusId) {
  return array
    .filter((elem) => elem.statusId !== +statusId + 1)
    .map((elem) => (document.getElementById(elem.statusId).disabled = true));
}

export default async function saveAndRenderCurrentOrderStatus(userId, orderId) {
  try {
    const response = await fetch(`/status/api/${userId}/${orderId}`, {
      method: "GET",
    });

    if (!response.ok) {
      const err = await response.text();
      console.log("response err", err);
    }

    const status = await response.json();
    let statusId = status.split(":")[1];

    const checkBoxCollection = document.querySelectorAll(
      `input[name=order-status]`
    );

    const arrayOfCheckBoxesID = [];

    for (let i = 0; i < checkBoxCollection.length; i++) {
      arrayOfCheckBoxesID.push({ statusId: +checkBoxCollection[i].id });
    }

    return status == "not-accepted-for-processing:0"
      ? renderUnmarkedCheckBoxForFirstStatus(arrayOfCheckBoxesID)
      : renderNextUnmarkedPendingStatus(arrayOfCheckBoxesID, statusId);
  } catch (err) {
    console.log(err);
  }
} //export to formForSetOrderStatus.js
