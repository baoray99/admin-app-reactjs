import { Table, Space, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProductsAPIBrand from "../api/ProductAPIBrand";
import Details from "../components/Details";
import AddDrawer from "../components/AddDrawer";

export default function ProductByBrand(props) {
  const id = props.match.params.id;
  const name = props.match.params.name;
  const title = name;
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
            // onClick={() =>
            //   ProductsAPI.deleteProductbyId(record.id).then((res) => {
            //     setLoading(true);
            //     ProductsAPI.getProducts()
            //       .then((res) => {
            //         setData(res.data);
            //         success();
            //         setLoading(false);
            //       })
            //       .catch((err) => {
            //         error();
            //       });
            //   })
            // }
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
    setLoading(true);
    ProductsAPIBrand.getProducts(id).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [id]); // [id ] thay doi thi bo trong nay no se tu reload lai
  return (
    <div>
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
