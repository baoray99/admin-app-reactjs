import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Drawer,
  Divider,
  Select,
  Space,
  Modal,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ProductsAPI from "../api/ProductsAPI";
import CategoryAPI from "../api/CategoriesAPI";
import BrandAPI from "../api/BrandAPI";

export default function AddDraw(props) {
  const { Option } = Select;
  const titleAdd = props.title;
  const catename = props.name;
  const brandname = props.brandname;
  const onClosed = props.onClose;
  const addvisible = props.addvisible;
  const [loading, setLoading] = useState(false);
  const [brands, getBrands] = useState([]);
  const [cates, getCates] = useState([]);
  const [categoried, setCategoried] = useState({});
  const [branded, setBranded] = useState({});
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 20,
    },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };
  function success() {
    Modal.success({
      content: "Add Success",
    });
  }
  function error() {
    Modal.error({
      title: "ERROR",
      content: "Add Fail",
    });
  }
  function setBrand(value) {
    brands.map((brand) => {
      if (brand.name === brandname) {
        setBranded(brand);
      }
      if (brand._id === value) {
        setBranded(brand);
      }
    });
  }
  function setCategory(value) {
    cates.map((cate) => {
      if (cate.name === catename) {
        setCategoried(cate);
      }
      if (cate._id === value) {
        setCategoried(cate);
      }
    });
  }
  const onFinish = (values) => {
    setLoading(true);
    const details = values.product_detail;
    const dd = {};
    details.map((detail) => {
      dd[detail.propname] = detail.propval;
    });
    const product = {
      name: values.name,
      id_category: values.id_category,
      category: categoried,
      id_brand: values.id_brand,
      brand: branded,
      price: values.price,
      sales_price: values.saleprice,
      quantity: values.quantity,
      image: values.images,
      product_detail: dd,
      description: values.description,
    };
    ProductsAPI.postProduct(product)
      .then((res) => {
        success();
        setLoading(true);
        setTimeout(() => window.location.reload(), 2000);
      })
      .catch((err) => {
        error();
        setLoading(false);
      });
  };
  useEffect(() => {
    BrandAPI.getBrands().then((res) => {
      getBrands(res.data);
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
        <Form
          {...layout}
          name="dynamic_form_item"
          onFinish={onFinish}
          validateMessages={validateMessages}
          style={{ width: "100%" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          {cates.map((cate) => {
            if (cate.name === catename) {
              return (
                <Form.Item
                  name="id_category"
                  label="Category"
                  rules={[
                    {
                      required: true,
                      message: "Please select category!",
                    },
                  ]}
                >
                  <Select
                    style={{ marginLeft: 10 }}
                    defaultValue={catename}
                    // disabled={true}
                    onChange={(value) => {
                      setCategory(value);
                    }}
                  >
                    <Option value={cate._id}>{cate.name}</Option>
                  </Select>
                </Form.Item>
              );
            }
          })}
          {!catename && (
            <Form.Item
              name="id_category"
              label="Category"
              rules={[
                {
                  required: true,
                  message: "Please select category!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ marginLeft: 10 }}
                placeholder="Please select category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {cates.map((catee) => {
                  return <Option value={catee._id}>{catee.name}</Option>;
                })}
              </Select>
            </Form.Item>
          )}

          {brands.map((brand) => {
            if (brand.name === brandname) {
              return (
                <Form.Item
                  name="id_brand"
                  label="Brand"
                  rules={[
                    {
                      required: true,
                      message: "Please select brand!",
                    },
                  ]}
                >
                  <Select
                    placeholder="Please select a brand"
                    style={{ marginLeft: 10 }}
                    defaultValue={brandname}
                    onChange={(value) => {
                      setBrand(value);
                    }}
                  >
                    <Option value={brand._id}>{brand.name}</Option>
                  </Select>
                </Form.Item>
              );
            }
          })}
          {!brandname && (
            <Form.Item
              name="id_brand"
              label="Brand"
              rules={[
                {
                  required: true,
                  message: "Please select brand!",
                },
              ]}
            >
              <Select
                placeholder="Please select a brand"
                showSearch
                style={{ marginLeft: 10 }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(value) => {
                  setBrand(value);
                }}
              >
                {brands.map((brandd) => {
                  return <Option value={brandd._id}>{brandd.name}</Option>;
                })}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                type: "number",
                min: 0,
                max: 1000000000,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="saleprice"
            label="Sale-price"
            rules={[
              {
                type: "number",
                min: 0,
                max: 1000000000,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                type: "number",
                min: 0,
                max: 100,
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
            {/* onChange={(e)=>{setValue(e.target.value)}} */}
          </Form.Item>
          <Divider orientation="center">
            <h3>Details</h3>
          </Divider>
          <Form.List name="product_detail">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                      justifyContent: "center",
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "propname"]}
                      fieldKey={[field.fieldKey, "propname"]}
                      rules={[{ required: true, message: "Missing prop name" }]}
                    >
                      <Input placeholder="Property" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "propval"]}
                      fieldKey={[field.fieldKey, "propval"]}
                      rules={[
                        { required: true, message: "Missing prop value" },
                      ]}
                    >
                      <Input placeholder="Value" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add product details
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Divider orientation="center">
            <h3>Images</h3>
          </Divider>
          <Form.List name="images">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...formItemLayout}
                    label="Image"
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message:
                            "Please input image's URL or delete this field.",
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Image's URL"
                        style={{ width: "60%" }}
                      />
                    </Form.Item>

                    <MinusCircleOutlined
                      style={{ marginLeft: 14 }}
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  </Form.Item>
                ))}
                <Form.Item
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: "100%" }}
                    icon={<PlusOutlined />}
                  >
                    Add image of product
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? "Submiting" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
