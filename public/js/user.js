async function GetUser() {
  const response = await fetch("/api/", {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const user = await response.json();
}
