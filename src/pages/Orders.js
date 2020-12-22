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
  const onSelectedItem = (record) => {
    setSelectedItem(record);
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    setLoading(true);
    OrderAPI.getOrders(JSON.parse(localStorage.getItem("token")), state).then(
      (res) => {
        setData(res.data);
        console.log("state", state);
        setLoading(false);
      }
    );
  }, [state]);
  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Customer's phone",
      dataIndex: "customer_phone",
      key: "customer_phone",
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
      render: (status) => <div>{status}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onSelectedItem(record)}>
            See More{" "}
          </Button>
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
