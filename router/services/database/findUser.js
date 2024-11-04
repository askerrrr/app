export default async function findUser(userId, passwd, userCollection) {
  try {
    return await userCollection.findOne({ userId, passwd });
  } catch (err) {
    console.log(err);
  }
}
