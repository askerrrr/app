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

    return statusValue === "not-accepted-for-processing"
      ? renderUnmarkedCheckBoxForFirstStatus(arrayOfCheckBoxesID)
      : renderNextUnmarkedPendingStatus(arrayOfCheckBoxesID, statusId);
  } catch (err) {
    console.log(err);
  }
} //export to formForSetOrderStatus.js

let a = {
  userId: "1111111111",
  firstName: "Test",
  userName: "",
  orders: [
    {
      order: {
        phone: 23333333333,
        userId: "1111111111",
        date: "13:11:03 - 04.10.2024",
        file: {
          url: "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9Ueu04NjTLGk/documents/file_160.xlsx",
          id: "253453453453450",
          pathToFile: "/var/www/userFiles/7413876142/911218c1abc543835d2c.xlsx",
          status: "not-accepted-for-processing:",
        },
        firstName: "Test",
        userName: "",
      },
    },
    {
      order: {
        phone: 11111111111111,
        userId: "1111111111",
        date: "13:11:03 - 04.10.2024",
        file: {
          url: "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9Ueu04NjTLGk/documents/file_161.xlsx",
          id: "353534330",
          pathToFile: "/var/www/userFiles/7413876142/911218c1abc543835d2c.xlsx",
          status: "not-accepted-for-processing:",
        },
        firstName: "Test",
        userName: "",
      },
    },
  ],
};
