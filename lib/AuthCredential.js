import axios from "axios";
export default async function AuthCredential(auth) {
  const res = await axios.post("http://127.0.0.1:1337/api/auth/local", {
    identifier: auth.username,
    password: auth.password,
  });
  if (res.status == 200) {
    console.log(res.data);
    return res.data;
  }

  return null;
}
