export default async function deleteUser(userId, collection) {
  return await collection.deleteOne({ userId });
}
