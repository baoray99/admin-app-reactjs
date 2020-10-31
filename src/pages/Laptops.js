import { Table, Space, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProductsAPI from "../api/ProductsAPI";
import Details from "../components/Details";
import AddDrawer from "../components/AddDrawer";

export default function Laptops(props) {
  const id = props.match.params.id;
  const title = "LAPTOP";
  const titleAdd = "ADD LAPTOP";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  const [visible, setVisible] = useState(false);
  const [addvisible, setAddvisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const onClosed = () => {
    setAddvisible(!addvisible);
  };
  const addopen = () => {
    setAddvisible(!addvisible);
  };
  const onSelectedItem = (record) => {
    setSelectedItem(record);
    setVisible(true);
  };
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
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      // render: (tags) => (
      //   <>
      //     {tags.map((tag) => {
      //       let color = tag.length > 5 ? "geekblue" : "green";
      //       if (tag === "loser") {
      //         color = "volcano";
      //       }
      //       return (
      //         <Tag color={color} key={tag}>
      //           {tag.toUpperCase()}
      //         </Tag>
      //       );
      //     })}
      //   </>
      // ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
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
          <Link target="_top" to={`/laptop/edit/${record.id}`}>
            <Button
              type="primary"
              shape="round"
              style={{ backgroundColor: "#ffb74d", borderColor: "#ffb74d" }}
            >
              Edit
              {/* {record.name} primary boi den het btn */}
            </Button>
          </Link>
          <Button
            type="primary"
            danger
            shape="round"
            onClick={() =>
              ProductsAPI.deleteProductbyId(record.id).then((res) => {
                setLoading(true);
                ProductsAPI.getProducts()
                  .then((res) => {
                    setData(res.data);
                    success();
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
  useEffect(() => {
    ProductsAPI.getProducts(id).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);
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
          <p style={{ fontSize: 24, margin: 0 }}>LAPTOPS</p>
        </div>
        {/* <Link target="_top" to="/laptop/add"> */}
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={30}
          onClick={addopen}
        >
          Add new Laptop
        </Button>
        {/* </Link> */}
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
