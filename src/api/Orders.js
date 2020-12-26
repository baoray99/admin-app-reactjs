import axios from "axios";
import * as moment from "moment";
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
function updateOrders(token, id, state) {
  return new Promise(function (resolve, reject) {
    axios
      .post(
        `https://dacnpm-test.herokuapp.com/orders/changeStatus/${id}?status=${state}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function cancelOrder(token, id) {
  return new Promise(function (resolve, reject) {
    axios
      .put(`https://dacnpm-test.herokuapp.com/orders/cancelOrder/${id}`, {
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
function getFullOrderShipping(token) {
  return new Promise(function (resolve, reject) {
    axios
      .get(
        "https://dacnpm-test.herokuapp.com/orders/ShippingOrder/getFullOrderShipping",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function getShipperIsTaking(token) {
  return new Promise(function (resolve, reject) {
    axios
      .get(
        "https://dacnpm-test.herokuapp.com/orders/statistic/getShipperIsTaking",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function Revenue(token, dateString) {
  const dateBody = {
    time_from: dateString[0],
    time_to: dateString[1],
  };
  {
    console.log("date3", dateString[0]);
  }
  return new Promise(function (resolve, reject) {
    axios
      .post(
        "https://dacnpm-test.herokuapp.com/orders/statistic/Revenue",
        dateBody,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function toComplete(token, id) {
  return new Promise(function (resolve, reject) {
    axios
      .put(`https://dacnpm-test.herokuapp.com/orders/state/Complete/${id}`, {
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
export default {
  getOrders,
  updateOrders,
  cancelOrder,
  getFullOrderShipping,
  getShipperIsTaking,
  Revenue,
  toComplete,
};
