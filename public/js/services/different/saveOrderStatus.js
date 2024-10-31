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

export default async function saveAndRenderCurrentOrderStatus(userId, fileId) {
  try {
    const response = await fetch(`/status/api/${userId}/${fileId}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.log("response err");
    }

    const status = await response.json();
    console.log("status", status);
    let [statusValue, statusId] = status.split(":");

    console.log(`ID : ${statusId}\nValue : ${statusValue}`);

    const checkBoxCollection = document.querySelectorAll(
      `input[name=order-status]`
    );

    const arrayOfCheckBoxesID = [];

    for (let i = 0; i < checkBoxCollection.length; i++) {
      arrayOfCheckBoxesID.push({ statusId: +checkBoxCollection[i].id });
    }

    console.log("arrayOfCheckBoxesID", arrayOfCheckBoxesID);

    return status == "not-accepted-for-processing:0"
      ? renderUnmarkedCheckBoxForFirstStatus(arrayOfCheckBoxesID)
      : renderNextUnmarkedPendingStatus(arrayOfCheckBoxesID, statusId);
  } catch (err) {
    console.log(err);
  }
} //export to formForSetOrderStatus.js
