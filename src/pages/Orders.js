import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Drawer, Button } from "antd";
import OrderAPI from "../api/Orders";
import OrderDrawer from "../components/OrderDrawer";

export default function Orders(props) {
  const [data, setData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const state = props.match.params.state;
  const [status, setStatus] = useState("");
  const onSelectedItem = (record) => {
    setSelectedItem(record);
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    setLoading(true);
    state
      ? OrderAPI.getOrders(
          JSON.parse(localStorage.getItem("token")),
          state
        ).then((res) => {
          setData(res.data);
          setLoading(false);
        })
      : OrderAPI.getFullOrderShipping(
          JSON.parse(localStorage.getItem("token"))
        ).then((res) => {
          setData(res.data);
          setLoading(false);
        });
  }, [state, status]);
  const columns = [
    {
      title: "Customer's name",
      dataIndex: !state ? "Customer's Name" : "userName",
      key: "Customer_name",
    },
    {
      title: "Customer's phone",
      dataIndex: "customer_phone",
      key: "customer_phone",
    },
    {
      title: "Shipper's name",
      dataIndex: "Shipper's Name",
      key: "shipperName",
    },

    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <div>
          {!state
            ? status === "Success"
              ? "Đã giao cho khách hàng"
              : status === "isTaken"
              ? "Đã được shipper lấy hàng"
              : "Giao dịch thành công"
            : status}
          {/* {status} */}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onSelectedItem(record)}>
            See More{" "}
          </Button>
          {state === "Submitted" ? (
            <div>
              <Button
                type="success"
                style={{ marginRight: 15 }}
                onClick={() => {
                  setStatus("Processing");
                  status &&
                    OrderAPI.updateOrders(
                      JSON.parse(localStorage.getItem("token")),
                      record._id,
                      status
                    ).then((res) => {
                      setLoading(true);
                      OrderAPI.getOrders(
                        JSON.parse(localStorage.getItem("token")),
                        state
                      ).then((res) => {
                        setData(res.data);
                        setLoading(false);
                      });
                    });
                }}
              >
                To Processing{" "}
              </Button>
              <Button
                type="success"
                onClick={() => {
                  OrderAPI.cancelOrder(
                    JSON.parse(localStorage.getItem("token")),
                    record._id
                  ).then((res) => {
                    setLoading(true);
                    console.log("success");
                    OrderAPI.getOrders(
                      JSON.parse(localStorage.getItem("token")),
                      state
                    ).then((res) => {
                      setData(res.data);
                      setLoading(false);
                    });
                  });
                }}
              >
                To Cancel{" "}
              </Button>
            </div>
          ) : state === "Processing" ? (
            <Button
              type="success"
              onClick={() => {
                setStatus("Shipping");
                status &&
                  OrderAPI.updateOrders(
                    JSON.parse(localStorage.getItem("token")),
                    record._id,
                    status
                  ).then((res) => {
                    setLoading(true);
                    OrderAPI.getOrders(
                      JSON.parse(localStorage.getItem("token")),
                      state
                    ).then((res) => {
                      setData(res.data);
                      setLoading(false);
                    });
                    console.log("sucess");
                  });
              }}
            >
              To Shipping{" "}
            </Button>
          ) : record.status === "Complete" || record.status === "Cancel" ? (
            ""
          ) : (
            <Button
              type="success"
              style={{ marginRight: 15 }}
              onClick={() => {
                OrderAPI.toComplete(
                  JSON.parse(localStorage.getItem("token")),
                  record._id
                ).then((res) => {
                  setLoading(true);
                  OrderAPI.getOrders(
                    JSON.parse(localStorage.getItem("token")),
                    state
                  ).then((res) => {
                    setData(res.data);
                    setLoading(false);
                  });
                });
              }}
            >
              To Complete{" "}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div>
        <p style={{ fontSize: 24 }}>{state} Items</p>
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
      <OrderDrawer item={selectedItem} onClose={onClose} visible={visible} />
    </div>
  );
}
