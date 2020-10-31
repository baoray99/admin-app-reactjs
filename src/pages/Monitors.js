import { Table, Space, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { useState, useEffect } from "react";
import Details from "../components/Details";
import ProductsAPI from "../api/ProductsAPI";

export default function Monitors(props) {
  const id = props.match.params.id;
  const title = "Monitors";
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      render: (brand)=><div>{brand.name}</div>
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Sale_Price",
      key: "sales_price",
      dataIndex: "sales_price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => onSelectedItem(record)}
            shape="round"
            style={{ backgroundColor: "#80deea", borderColor: "#80deea" }}
          >
            More Details
            {/* {record.name} primary boi den het btn */}
          </Button>
          <Button
            type="primary"
            shape="round"
            style={{ backgroundColor: "#ffb74d", borderColor: "#ffb74d" }}
          >
            Edit
            {/* {record.name} primary boi den het btn */}
          </Button>
          <Button type="primary" danger shape="round">
            Delete
            {/* {record.name} primary boi den het btn */}
          </Button>
        </Space>
      ),
      width: 200,
    },
  ];
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">
        {title}:{content}
      </p>
    </div>
  );
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const onSelectedItem = (record) => {
    setSelectedItem(record);
    setVisible(true);
  };
  useEffect(() => {
    ProductsAPI.getProducts(id).then((res) => {
      console.log("data", res);
      setData(res.data);
      setLoading(false);
    });
  });
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 60,
          width: "100%",
        }}
      >
        <div>
          <p style={{ fontSize: 24, margin: 0 }}>MONITORS</p>
        </div>
        <Button type="primary" shape="round" icon={<PlusOutlined />} size={30}>
          Add new Monitor
        </Button>
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
      <Details
        item={selectedItem}
        onClose={onClose}
        visible={visible}
        title={title}
      />
    </div>
  );
}
