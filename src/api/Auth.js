import axios from "axios";

function login(username, password) {
  return new Promise(function (resolve, reject) {
    axios
      .post("https://reqres.in/api/login", {
        email: username,
        password: password,
      })
      .then((res) => {
        resolve(res);
        localStorage.setItem("token", JSON.stringify(res.data.token))
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default { login };
