import React, { useState } from "react";
import ProductsAPI from "../api/ProductsAPI";
import { useHistory } from "react-router-dom";
import { Input, Divider, Col, Row, Button, Select, Modal } from "antd";
const { TextArea } = Input;
const { Option } = Select;

export default function Addproduct() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState();
  const [saleprice, setSaleprice] = useState();
  const [origin, setOrigin] = useState("");
  const [quantity, setQuantity] = useState();
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onChange = (value) => {
    setColor(value);
  };
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
    const product = {
      name: name,
      brand: brand,
      price: price,
      sales_price: saleprice,
      madeIn: origin,
      quantity: quantity,
      size: size,
      color: color,
      Image: image,
      description: description,
    };
    ProductsAPI.postProduct(product)
      .then((res) => {
        success();
        setLoading(false);
        setTimeout(() => history.push("/laptops"), 2000);
      })
      .catch((err) => {
        error();
        setLoading(false);
      });
  };
  return (
    <div>
      <Divider orientation="center">
        <h1>LAPTOP</h1>
      </Divider>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Col span={12} style={{ display: "flex" }}>
          <h3>Name: </h3>
          <Input
            onChange={(e) => setName(e.target.value)}
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
        <Col span={6} style={{ display: "flex", paddingRight: 15 }}>
          <h3>Brand: </h3>
          <Input
            onChange={(e) => {
              setBrand(e.target.value);
            }}
            style={{ marginLeft: 10 }}
          ></Input>
        </Col>
        <Col span={6} style={{ display: "flex", paddingLeft: 15 }}>
          <h3>Origin: </h3>
          <Input
            onChange={(e) => {
              setOrigin(e.target.value);
            }}
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
        <Col span={6} style={{ display: "flex", paddingRight: 15 }}>
          <h3>Price: </h3>
          <Input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            style={{ marginLeft: 10, height: 33.79 }}
          ></Input>
        </Col>
        <Col span={6} style={{ display: "flex", paddingLeft: 15 }}>
          <h3>Sale-price: </h3>
          <Input
            onChange={(e) => {
              setSaleprice(e.target.value);
            }}
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
        <Col span={4} style={{ display: "flex", paddingRight: 15 }}>
          <h3>Size: </h3>
          <Input
            onChange={(e) => {
              setSize(e.target.value);
            }}
            style={{ marginLeft: 10, height: 33.79 }}
          ></Input>
        </Col>
        <Col span={4} style={{ display: "flex", paddingLeft: 15 }}>
          <h3>Color: </h3>
          <Select
            showSearch
            style={{ marginLeft: 10 }}
            placeholder="Select a color"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            onChange={onChange}
          >
            <Option value="red">Red</Option>
            <Option value="black">Black</Option>
            <Option value="gold">Gold</Option>
          </Select>
        </Col>
        <Col span={4} style={{ display: "flex", paddingLeft: 15 }}>
          <h3>Quantity: </h3>
          <Input
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
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
        <Col span={12} style={{ display: "flex" }}>
          <h3>Image: </h3>
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
        <Col span={12} style={{ display: "flex" }}>
          <Input
            onChange={(e) => {
              setImage(e.target.value);
            }}
            style={{ marginLeft: 10, height: 33.79 }}
          ></Input>
        </Col>
      </Row>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <Col span={12} style={{ display: "flex" }}>
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
        <Col span={12} style={{ display: "flex" }}>
          <TextArea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
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
    </div>
  );
}
