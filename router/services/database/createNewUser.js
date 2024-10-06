async function createNewUser(collection, orderContent) {
  return await collection.insertOne({
    tgId: id,
    firstName: orderContent.firstName,
    userName: orderContent.userName,
    orders: [],
  });
}

export default createNewUser;
