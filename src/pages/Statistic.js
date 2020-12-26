import React, { useState, useEffect } from "react";
import { Table, Statistic, DatePicker, Space, Button } from "antd";
import OrderAPI from "../api/Orders";
import OrderDrawer from "../components/OrderDrawer";
import * as moment from "moment";

export default function Statistics() {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dateString, setDateString] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const { RangePicker } = DatePicker;
  const onChange = (dateString) => {
    const date = [];
    dateString.map((datee) => {
      date.push(moment(datee._d).format("YYYY-MM-DD"));
    });
    setDateString(date);
  };
  const onSelectedItem = (record) => {
    setSelectedItem(record);
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    setLoading(true);
    OrderAPI.getShipperIsTaking(JSON.parse(localStorage.getItem("token"))).then(
      (res) => {
        setData1(res.data);
        setLoading(false);
      }
    );
    dateString &&
      OrderAPI.Revenue(
        JSON.parse(localStorage.getItem("token")),
        dateString
      ).then((res) => {
        setData2(res.data);
        setLoading(false);
      });
  }, [dateString]);
  const columns1 = [
    {
      title: "Date",
      key: "create_at",
      dataIndex: "create_at",
      render: (create_at) => <p>{moment(create_at).format("YYYY-MM-DD")}</p>,
    },
    {
      title: "Shipper's name",
      dataIndex: "Shipper's name",
      key: "Shipper's name",
    },
    {
      title: "Shipper's username",
      dataIndex: "Shipper's username ",
      key: "Shipper's username ",
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
      render: (status) => (
        <div>
          {status === "Success"
            ? "Đã giao cho khách hàng"
            : status === "isTaken"
            ? "Đã được shipper lấy hàng"
            : "Giao dịch thành công"}
        </div>
      ),
    },
  ];
  const columns2 = [
    {
      title: "Date",
      key: "create_at",
      dataIndex: "create_at",
      render: (create_at) => <p>{moment(create_at).format("YYYY-MM-DD")}</p>,
    },
    {
      title: "Customer's phone",
      dataIndex: "customer_phone",
      key: "customer_phone",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <div>
          {status === "Success"
            ? "Đã giao cho khách hàng"
            : status === "isTaken"
            ? "Đã được shipper lấy hàng"
            : "Giao dịch thành công"}
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
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div>
        <p style={{ fontSize: 24 }}>Shipper Statistic Table</p>
      </div>
      <Table columns={columns1} dataSource={data1} loading={loading} />
      <div>
        <p style={{ fontSize: 24, marginTop: 24 }}>Revenue Table</p>
      </div>
      <Space direction="vertical" size={12} style={{ marginBottom: 24 }}>
        <RangePicker onChange={onChange} />
      </Space>
      <div
        style={{ display: "flex", width: 360, justifyContent: "space-between" }}
      >
        <p>Doanh thu: {data2 && data2.revenue}</p>
        <p>Thực thu: {data2 && data2.money_get}</p>
      </div>
      <Table
        columns={columns2}
        dataSource={data2 && data2.order}
        loading={loading}
      />
      <OrderDrawer item={selectedItem} onClose={onClose} visible={visible} />
    </div>
  );
}
