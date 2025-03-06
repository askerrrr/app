export default async function findUser(user, adminCollection) {
  try {
    var document = await adminCollection.findOne({ user: user });

    return document.user;
  } catch (err) {
    console.log(err);
  }
}
