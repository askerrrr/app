import findUser from "./findUser.js";
import deleteUser from "./deleteUser.js";
import addNewOrder from "./addNewOrder.js";
import deleteOrder from "./deleteOrder.js";
import createNewUser from "./createNewUser.js";

const db = { addNewOrder, createNewUser, deleteOrder, deleteUser, findUser };

export default db;
