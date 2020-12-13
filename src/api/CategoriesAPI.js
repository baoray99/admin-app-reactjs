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
function addCategory(cate) {
  return new Promise(function (resolve, reject) {
    axios
      .post("https://dacnpm-test.herokuapp.com/categories/", cate)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function editCategory(cateId, cate) {
  return new Promise(function (resolve, reject) {
    axios
      .put(`https://dacnpm-test.herokuapp.com/categories/${cateId}`, cate)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function deleteCategory(cateId) {
  return new Promise(function (resolve, reject) {
    axios
      .delete(`https://dacnpm-test.herokuapp.com/categories/${cateId}`)
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
  editCategory,
  deleteCategory,
  addCategory,
};
