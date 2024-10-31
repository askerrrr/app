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

    let [statusValue, statusId] = status.split(":");

    console.log(`ID : ${statusId}\nValue : ${statusValue}`);

    const checkBoxCollection = document.querySelectorAll(
      `input[name=order-status]`
    );

    const arrayOfCheckBoxesID = [];

    for (let i = 0; i < checkBoxCollection.length; i++) {
      arrayOfCheckBoxesID.push({ statusId: +checkBoxCollection[i].id });
    }

    console.log(arrayOfCheckBoxesID);

    return statusValue === "not-accepted-for-processing:0"
      ? renderUnmarkedCheckBoxForFirstStatus(arrayOfCheckBoxesID)
      : renderNextUnmarkedPendingStatus(arrayOfCheckBoxesID, statusId);
  } catch (err) {
    console.log(err);
  }
} //export to formForSetOrderStatus.js

let a = {
  userId: "7413876142",
  firstName: "Test",
  userName: "",
  orders: [
    {
      order: {
        phone: 88888888888,
        userId: "7413876142",
        date: "18:11:03 - 00.10.2024",
        file: {
          url: "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9Ueu04NjTLGk/documents/file_188.xlsx",
          id: "470653276440",
          pathToFile: "/var/www/userFiles/7413876142/470653276440.xlsx",
          status: "not-accepted-for-processing:",
        },
        firstName: "Test",
        userName: "",
      },
    },
  ],
};
