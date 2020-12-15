import axios from "axios";

function getProducts(id) {
  return new Promise(function (resolve, reject) {
    axios
      .get(`https://dacnpm-test.herokuapp.com/products/?id_brand=${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export default {
  getProducts,
};
