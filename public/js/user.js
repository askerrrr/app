async function GetUser() {
  const urlParams = new URLSearchParams(window.location.search);

  const tgId = urlParams.get("tgId");

  const response = await fetch(`/api/orderinfo/${tgId}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  const user = await response.json();

  const div = document.getElementById("div");

  div.innerHTML = JSON.stringify(user);

  return div;
}

GetUser();
