import React, { useEffect, useState, useRef, useContext } from "react";
import ProductsAPI from "../api/ProductsAPI";
import CategoryAPI from "../api/CategoriesAPI";
import BrandAPI from "../api/BrandAPI";
import {
  Drawer,
  Col,
  Row,
  Input,
  Divider,
  Button,
  Select,
  Modal,
  Table,
  Popconfirm,
  Form,
} from "antd";
import EditableTable from "./AddDetailProduct";
import EditImage from "./AddImageProduct";
const { TextArea } = Input;
const { Option } = Select;
export default function AddDrawer(props) {
  const [brands, setBrands] = useState([]);
  const [cates, getCates] = useState([]);
  // const [name, setName] = useState("");
  // const [brand, setBrand] = useState("");
  // const [price, setPrice] = useState();
  // const [saleprice, setSaleprice] = useState();
  // const [quantity, setQuantity] = useState();
  // const [images, setImages] = useState([]);
  // const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const onClosed = props.onClose;
  const addvisible = props.addvisible;
  const titleAdd = props.title;

  // const onChange = (value) => {
  //   setBrand(value);
  // };
  function success() {
    Modal.success({
      content: "Add Successfully",
    });
  }
  function error() {
    Modal.error({
      title: "ERROR",
      content: "Add Fail",
    });
  }
  const onFinish = () => {
    setLoading(true);
    // const product = {
    //   name: name,
    //   brand: brand,
    //   price: price,
    //   sales_price: saleprice,
    //   quantity: quantity,
    //   Image: images,
    //   description: description,
    // };
    // ProductsAPI.postProduct(product)
    //   .then((res) => {
    //     success();
    //     setLoading(false);
    //     setTimeout(() => window.location.reload(), 2000);
    //   })
    //   .catch((err) => {
    //     error();
    //     setLoading(false);
    //   });
  };
  useEffect(() => {
    BrandAPI.getBrands().then((res) => {
      setBrands(res.data);
    });
  }, []);
  useEffect(() => {
    CategoryAPI.getCategories().then((res) => {
      getCates(res.data);
    });
  }, []);
  return (
    <div>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClosed}
        visible={addvisible}
      >
        <Divider orientation="center">
          <h1>{titleAdd}</h1>
        </Divider>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Col span={24} style={{ display: "flex" }}>
            <h3>Name: </h3>
            <Input
              // onChange={(e) => setName(e.target.value)}
              style={{ marginLeft: 10 }}
            ></Input>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Col span={12} style={{ display: "flex", paddingRight: 15 }}>
            <h3>Category: </h3>
            <Select
              showSearch
              style={{ marginLeft: 10 }}
              placeholder="Select category"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // onChange={onChange}
            >
              {cates.map((catee) => {
                return <Option value={catee.name}>{catee.name}</Option>;
              })}
            </Select>
          </Col>
          <Col span={12} style={{ display: "flex", paddingRight: 15 }}>
            <h3>Brand: </h3>
            <Select
              showSearch
              style={{ marginLeft: 10 }}
              placeholder="Select brand"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // onChange={onChange}
            >
              {brands.map((brandd) => {
                return <Option value={brandd.name}>{brandd.name}</Option>;
              })}
            </Select>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Col span={12} style={{ display: "flex", paddingRight: 15 }}>
            <h3>Price: </h3>
            <Input
              // onChange={(e) => {
              //   setPrice(e.target.value);
              // }}
              style={{ marginLeft: 10, height: 33.79 }}
            ></Input>
          </Col>
          <Col span={12} style={{ display: "flex", paddingLeft: 15 }}>
            <h3>Sale-price: </h3>
            <Input
              // onChange={(e) => {
              //   setSaleprice(e.target.value);
              // }}
              style={{ marginLeft: 10, height: 33.79 }}
            ></Input>
          </Col>
        </Row>

        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Col span={24} style={{ display: "flex" }}>
            <h3>Image: </h3>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <EditImage />
          </Col>
        </Row>

        <Divider>
          <h3>Details</h3>
        </Divider>
        <Row>
          <Col span={24}>
            <EditableTable />
          </Col>
          {/* <TableEdit /> */}
        </Row>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Col span={24} style={{ display: "flex" }}>
            <h3>Description: </h3>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Col span={24} style={{ display: "flex" }}>
            <TextArea
              // onChange={(e) => {
              //   setDescription(e.target.value);
              // }}
              rows={6}
            ></TextArea>
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
            <Button
              loading={loading}
              type="primary"
              shape="round"
              onClick={onFinish}
            >
              {loading ? "Saving..." : "Save / Change"}
            </Button>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
}
