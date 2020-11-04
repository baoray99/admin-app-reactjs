import axios from "axios";

function getBrands() {
  return new Promise(function (resolve, reject) {
    axios
      .get("https://dacnpm-test.herokuapp.com/brands/")
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export default {
  getBrands,
};
