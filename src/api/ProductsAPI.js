import axios from "axios";

function getProducts(id) {
  return new Promise(function (resolve, reject) {
    axios
      .get(`https://dacnpm-test.herokuapp.com/products/?id_category=${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
function getProductbyId(id) {
  return new Promise(function (resolve, reject) {
    axios
      .get(`http://dacnpm-test.herokuapp.com/products/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
function postProduct(product) {
  return new Promise(function (resolve, reject) {
    axios
      .post("https://dacnpm-test.herokuapp.com/products/", product)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function updateProduct(id, product) {
  return new Promise(function (resolve, reject) {
    axios
      .put(
        `https://5f83fcb76b97440016f4ed69.mockapi.io/products/products/${id}`,
        product
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function deleteProductbyId(id) {
  return new Promise(function (resolve, reject) {
    axios
      .delete(`https://dacnpm-test.herokuapp.com/products/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export default {
  getProducts,
  getProductbyId,
  postProduct,
  updateProduct,
  deleteProductbyId,
};
