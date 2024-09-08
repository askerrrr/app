async function GetUser() {
  try {
    const response = await fetch("/api/user", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    const user = await response.json();
  } catch (err) {
    console.log(err);
  }
}

GetUser();
