import axios from "axios";

function getCategories() {
  return new Promise(function (resolve, reject) {
    axios
      .get("https://dacnpm-test.herokuapp.com/categories")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export default {
  getCategories,
};
