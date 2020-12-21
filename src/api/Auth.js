import axios from "axios";

function login(email, password) {
  return new Promise(function (resolve, reject) {
    axios
      .post("https://dacnpm-test.herokuapp.com/login", {
        username: email,
        password: password,
      })
      .then((res) => {
        resolve(res);
        localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function getDetail(token) {
  return new Promise(function (resolve, reject) {
    axios
      .get("https://dacnpm-test.herokuapp.com/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default { login, getDetail };
