import db from "../../../database/db.js";

var allItemsArePurchased = async (userId, orderId, collection) => {
  var items = await db.getItemStatus(userId, orderId, collection);

  var itemStatus = items.map((item) => item.split(":::")[1]);
  console.log(itemStatus);
  return itemStatus.every((e) => e == "2");
};

export default allItemsArePurchased;
