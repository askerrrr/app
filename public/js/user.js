async function GetUser() {
  const urlParam = new URLSearchParams(window.location.search);
  const tgId = urlParam.get("tgId");
  const response = await fetch(`/api/user/orderinfo/${tgId}`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  const user = await response.json();
  const div = document.getElementById("div");
  div.innerHTML = `${user}`;
  return div;
}

GetUser();
