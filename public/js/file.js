async function GetFile() {
  try {
    const pathParts = window.location.pathname.split("/");
    const fileId = pathParts[pathParts.length - 1];

    const response = await fetch(`/orderinfo/${fileId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      console.log("response error");
    }

    const json = await response.json();
    const result = await checkBufferOrString(json);
    return result;
  } catch (err) {
    console.log(err.message);
  }
}

GetFile();
