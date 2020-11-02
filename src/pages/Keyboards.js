import { Table, Space, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { useState, useEffect } from "react";
import Details from "../components/Details";
import ProductsAPI from "../api/ProductsAPI";
import AddDrawer from "../components/AddDrawer";

export default function Keyboards(props) {
  const id = props.match.params.id;
  const title = "Keyboard";
  const titleAdd = "ADD KEYBOARD";
  const [addvisible, setAddvisible] = useState(false);
  function success() {
    Modal.success({
      content: "Delete Successfully",
    });
  }
  function error() {
    Modal.error({
      title: "ERROR",
      content: "Delete Fail",
    });
  }
  const onClosed = () => {
    setAddvisible(!addvisible);
  };
  const addopen = () => {
    setAddvisible(!addvisible);
  };
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
      render: (brand) => <div>{brand.name}</div>,
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
          <Button
            type="primary"
            danger
            shape="round"
            onClick={() =>
              ProductsAPI.deleteProductbyId(record.id).then((res) => {
                setLoading(true);
                ProductsAPI.getProducts(id)
                  .then((res) => {
                    success();
                    setData(res.data);
                    setLoading(false);
                  })
                  .catch((err) => {
                    error();
                  });
              })
            }
          >
            Delete
            {/* {record.name} primary boi den het btn */}
          </Button>
        </Space>
      ),
      width: 200,
    },
  ];
  const [visible, setVisible] = useState(false);
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
          <p style={{ fontSize: 24, margin: 0 }}>KEYBOARDS</p>
        </div>
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={30}
          onClick={addopen}
        >
          Add new Keyboard
        </Button>
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
      <Details
        item={selectedItem}
        onClose={onClose}
        visible={visible}
        title={title}
      />
      <AddDrawer addvisible={addvisible} onClose={onClosed} title={titleAdd} />
    </div>
  );
}
