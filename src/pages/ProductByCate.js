import { Table, Space, Button, Modal, Input, Menu, Dropdown } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
// useRef de lay thuoc tinh cac component khac
import ProductsAPI from "../api/ProductsAPI";
import CateAPI from "../api/CategoriesAPI";
import Details from "../components/Details";
import AddDrawer from "../components/AddDrawer";
import EditDrawer from "../components/EditDrawer";
export default function ProductByCate(props) {
  const { Search } = Input;
  const history = useHistory();
  const inputRef = useRef();
  const id = props.match.params.id;
  const [click, setClick] = useState(false);
  const [idedit, setIdedit] = useState("");
  const [productDetail, setProductDetail] = useState({});
  const [name, setName] = useState(props.match.params.name);
  const title = name;
  const titleAdd = `Add ${name}`;
  const titleEdit = `Edit ${name}`;
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  const [visible, setVisible] = useState(false);
  const [addvisible, setAddvisible] = useState(false);
  const [editvisible, setEditvisible] = useState(false);
  useEffect(() => {
    setName(props.match.params.name);
    setLoading(true);
    ProductsAPI.getProducts(id).then((res) => {
      setData(res.data);
      setResult(res.data);
      setLoading(false);
    });
  }, [id]);
  useEffect(() => {
    if (idedit) {
      ProductsAPI.getProductbyId(idedit).then((res) => {
        setProductDetail(res.data);
      });
    }
  }, [idedit]);
  const onSearch = (value) => {
    console.log(value);
    setSearch(value);
    const resultSearch = data.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
    setResult(resultSearch);
  }; // search realtime name
  const onClose = () => {
    setVisible(false);
  };
  const onClosed = () => {
    setAddvisible(!addvisible);
  };
  const onClosedd = () => {
    setEditvisible(!editvisible);
  };
  const addopen = () => {
    setAddvisible(!addvisible);
  };
  const editopen = (record) => {
    setIdedit(record.id);
    setTimeout(() => setEditvisible(!editvisible), 500);
  };
  const onSelectedItem = (record) => {
    setSelectedItem(record);
    setVisible(true);
  };
  const editCate = (value, id) => {
    const cate = {
      name: value,
    };
    CateAPI.editCategory(id, cate)
      .then((res) => {
        setTimeout(() => window.location.reload(), 500);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const deleCate = (id) => {
    CateAPI.deleteCategory(id)
      .then((res) => {
        history.push("/home");
        window.location.reload();
      })
      .catch((err) => {});
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button onClick={() => deleCate(id)}>OK CHƯA ?</Button>
      </Menu.Item>
    </Menu>
  );
  function success() {
    Modal.success({
      content: "Delete Success",
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
          <Button
            type="primary"
            shape="round"
            style={{ backgroundColor: "#ffb74d", borderColor: "#ffb74d" }}
            onClick={() => {
              editopen(record);
            }}
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
        <div
          style={{
            display: "flex",
            width: 640,
            alignItems: "center",
          }}
        >
          {click ? (
            <Input
              ref={inputRef}
              placeholder={name}
              suffix={
                <Button
                  icon={<CheckOutlined />}
                  onClick={(e) => {
                    editCate(inputRef.current.state.value, id);
                  }}
                ></Button>
              }
            />
          ) : (
            <p style={{ fontSize: 24, marginRight: 24 }}>{name}</p>
          )}
          <div
            style={{
              width: 80,
              display: "flex",
              justifyContent: "space-between",
              marginRight: 30,
            }}
          >
            <Button
              icon={<EditOutlined />}
              onClick={() => {
                setClick(!click);
              }}
            ></Button>
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button icon={<DeleteOutlined />}></Button>
            </Dropdown>
          </div>
          <Search
            placeholder="Search Product"
            allowClear
            size="middle"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        {/* <Link target="_top" to="/laptop/add"> */}
        <Button
          type="primary"
          shape="round"
          icon={<PlusOutlined />}
          size={30}
          onClick={addopen}
        >
          Add new {name}
        </Button>
        {/* </Link> */}
      </div>
      <Table columns={columns} dataSource={result} loading={loading} />
      {visible ? (
        <Details
          item={selectedItem}
          onClose={onClose}
          visible={visible}
          title={title}
        />
      ) : (
        ""
      )}

      {addvisible ? (
        <AddDrawer
          addvisible={addvisible}
          onClose={onClosed}
          title={titleAdd}
          name={name}
        />
      ) : (
        ""
      )}

      {editvisible ? (
        <EditDrawer
          editvisible={editvisible}
          onClose={onClosedd}
          title={titleEdit}
          name={name}
          item={productDetail}
        />
      ) : (
        ""
      )}
    </div>
  );
}
