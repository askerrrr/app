function renderUnmarkedCheckBoxForFirstStatus(array) {
  const arrWithoutFirstStatus = array.slice(1);
  console.log(arrWithoutFirstStatus);
  arrWithoutFirstStatus.forEach((item) => {
    document.getElementById(item.statusId).disabled = true;
  });
}

function renderNextUnmarkedPendingStatus(array, statusId) {
  const arr = array.filter((elem) => elem.statusId !== statusId + 1);
  console.log("next", arr);
  arr.forEach((elem) => {
    return (document.getElementById(elem.statusId).disabled = true);
  });
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
    let statusValue = status.split(":")[0];
    let statusId = +status.split(":")[1] || null;

    console.log(`ID : ${statusId}\nValue : ${statusValue}`);

    const checkBoxCollection = document.querySelectorAll(
      `input[name=order-status]`
    );

    const arrayOfCheckBoxesID = [];

    for (let i = 0; i < checkBoxCollection.length; i++) {
      arrayOfCheckBoxesID.push({ statusId: +checkBoxCollection[i].id });
    }

    console.log(arrayOfCheckBoxesID);

    return statusValue === "no"
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
      orderContent: {
        phone: 89281748384,
        userId: "1111111111",
        date: "13:11:03 - 04.10.2024",
        file: {
          url: "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9Ueu04NjTLGk/documents/file_160.xlsx",
          id: "22222222222220",
          pathToFile: "/var/www/userFiles/7413876142/911218c1abc543835d2c.xlsx",
          status: "no",
        },
        firstName: "Test",
        userName: "",
      },
    },
    {
      orderContent: {
        phone: 89281748384,
        userId: "1111111111",
        date: "13:11:03 - 04.10.2024",
        file: {
          url: "https://api.telegram.org/file/bot7375008224:AAEctRRaK9XAinaQO838sWD9Ueu04NjTLGk/documents/file_161.xlsx",
          id: "111111111110",
          pathToFile: "/var/www/userFiles/7413876142/911218c1abc543835d2c.xlsx",
          status: "no",
        },
        firstName: "Test",
        userName: "",
      },
    },
  ],
};
