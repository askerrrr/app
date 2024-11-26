import argon2 from "argon2";

export default async function verifyFormData(login, passwd, collection) {
  try {
    const data = await collection.findOne();
    const loginHash = data.login;
    const passwdHash = data.passwd;

    const validLogin = await argon2.verify(loginHash, login);
    const validPasswd = await argon2.verify(passwdHash, passwd);

    return validLogin && validPasswd;
  } catch (err) {
    console.log(err);
  }
}
