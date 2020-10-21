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
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default { login };
