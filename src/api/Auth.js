import axios from "axios";

function login(email, password) {
  return new Promise(function (resolve, reject) {
    axios
      .post("https://travellove-cndd.herokuapp.com/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        resolve(res);
        localStorage.setItem("token", JSON.stringify(res.data.token));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default { login };
