export default async function changeOrderStatus(userId, fileId, status) {
  try {
    const response = await fetch(`/status/${userId}/${fileId}/${status}`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) console.log(response.error);

    return response;
  } catch (err) {
    console.log(err);
  }
}
