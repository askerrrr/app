import { row } from "./services/row/row.js";

async function GetUser() {
  try {
    const pathParts = window.location.pathname.split("/");
    const tgId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/data/${tgId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const user = await response.json();

    return row(user);
  } catch (err) {
    console.log(err);
  }
}

GetUser();

async function GetImage() {
  try {
    const response = await fetch(`/orderinfo/getimage/${tgId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const json = await response.json()

    const body = document.getElementById("img");
    const image = `<img src='data:image/jpeg;base64,${encodingToBase64(
      imgJson
    )}'/>`;

    body.append(image);
    return body;
  } catch (err) {
    console.log(err);
  }
}
