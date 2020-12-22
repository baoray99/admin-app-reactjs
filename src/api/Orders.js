import axios from "axios";
function getOrders(token, state) {
  return new Promise(function (resolve, reject) {
    axios
      .get(`https://dacnpm-test.herokuapp.com/orders/status/${state}`, {
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
export default { getOrders };
