import { Table, Space, Button, Modal, Input, Dropdown, Menu } from "antd";
import {
  PlusOutlined,
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import ProductsAPIBrand from "../api/ProductAPIBrand";
import ProductsAPI from "../api/ProductsAPI";
import BrandAPI from "../api/BrandAPI";
import Details from "../components/Details";
import AddDrawer from "../components/AddDrawer";
import EditDrawer from "../components/EditDrawer";

export default function ProductByBrand(props) {
  const { Search } = Input;
  const history = useHistory();
  const inputRef = useRef();
  const [click, setClick] = useState(false);
  const id = props.match.params.id;
  const [idedit, setIdedit] = useState("");
  const [productDetail, setProductDetail] = useState({});
  const brandname = props.match.params.name;
  const title = brandname;
  const titleAdd = `Add ${brandname} product`;
  const titleEdit = `Edit ${brandname} product`;
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState([]);
  const [visible, setVisible] = useState(false);
  const [addvisible, setAddvisible] = useState(false);
  const [editvisible, setEditvisible] = useState(false);
  useEffect(() => {
    setLoading(true);
    ProductsAPIBrand.getProducts(id).then((res) => {
      setData(res.data);
      setResult(res.data);
      setLoading(false);
    });
  }, [id]); // [id ] thay doi thi bo trong nay no se tu reload lai
  useEffect(() => {
    if (idedit) {
      ProductsAPI.getProductbyId(idedit).then((res) => {
        setProductDetail(res.data);
      });
    }
  }, [idedit]);
  const onSearch = (value) => {
    setSearch(value);
    const resultSearch = data.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase())
    );
    setResult(resultSearch);
  };
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
  const editBrand = (value, id) => {
    const brand = {
      name: value,
    };
    BrandAPI.editBrand(id, brand)
      .then((res) => {
        setTimeout(() => window.location.reload(), 500);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const deleBrand = (id) => {
    BrandAPI.deleteBrand(id)
      .then((res) => {
        history.push("/home");
        window.location.reload();
      })
      .catch((err) => {});
  };
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Button onClick={() => deleBrand(id)}>OK CHƯA ?</Button>
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
                ProductsAPIBrand.getProducts(id)
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
            alignItems: "center",
          }}
        >
          {click ? (
            <Input
              ref={inputRef}
              placeholder={brandname}
              suffix={
                <Button
                  icon={<CheckOutlined />}
                  onClick={(e) => {
                    editBrand(inputRef.current.state.value, id);
                  }}
                ></Button>
              }
            />
          ) : (
            <p style={{ fontSize: 24, marginRight: 24 }}>{brandname}</p>
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
            onChange={onSearch}
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
          Add new product
        </Button>
        {/* </Link> */}
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
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
          brandname={brandname}
        />
      ) : (
        ""
      )}

      {editvisible ? (
        <EditDrawer
          editvisible={editvisible}
          onClose={onClosedd}
          title={titleEdit}
          brandname={brandname}
          item={productDetail}
        />
      ) : (
        ""
      )}
    </div>
  );
}
