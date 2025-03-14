import findUser from "./services/findUser.js";
import addItems from "./services/addItems.js";
import getItemId from "./services/getItemId.js";
import deleteUser from "./services/deleteUser.js";
import addNewOrder from "./services/addNewOrder.js";
import deleteOrder from "./services/deleteOrder.js";
import updateItemId from "./services/updateItemId.js";
import findFilePath from "./services/findFilePath.js";
import createNewUser from "./services/createNewUser.js";
import getItemStatus from "./services/getItemStatus.js";
import checkOrderType from "./services/checkOrderType.js";
import getActiveOrders from "./services/getActiveOrders.js";
import updateItemStatus from "./services/updateItemStatus.js";
import updateOrderStatus from "./services/updateOrderStatus.js";
import getCompletedOrders from "./services/getCompletedOrders.js";
import createItemCollection from "./services/createItemCollection.js";
import getCurrentOrderStatus from "./services/getCurrentOrderStatus.js";

var db = {
  findUser,
  findUser,
  addItems,
  getItemId,
  deleteUser,
  addNewOrder,
  deleteOrder,
  deleteOrder,
  updateItemId,
  findFilePath,
  createNewUser,
  getItemStatus,
  checkOrderType,
  getActiveOrders,
  updateItemStatus,
  updateOrderStatus,
  getCompletedOrders,
  createItemCollection,
  getCurrentOrderStatus,
};

export default db;
