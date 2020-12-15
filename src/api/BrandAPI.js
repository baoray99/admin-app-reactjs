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
function addBrand(brand) {
  return new Promise(function (resolve, reject) {
    axios
      .post("https://dacnpm-test.herokuapp.com/brands/", brand)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function editBrand(brandId, brand) {
  return new Promise(function (resolve, reject) {
    axios
      .put(`https://dacnpm-test.herokuapp.com/brands/${brandId}`, brand)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function deleteBrand(brandId) {
  return new Promise(function (resolve, reject) {
    axios
      .delete(`https://dacnpm-test.herokuapp.com/brands/${brandId}`)
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
  addBrand,
  editBrand,
  deleteBrand,
};
