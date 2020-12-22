import { Layout, Menu, Avatar, Input, Dropdown, Button } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import {
//   faKeyboard,
//   faMouse,
//   faSdCard,
//   faCoffee,
//   faTv,
// } from "@fortawesome/free-solid-svg-icons";
import Home from "../pages/Home";
import Orders from "../pages/Orders";
import CategoriesAPI from "../api/CategoriesAPI";
import BrandsAPI from "../api/BrandAPI";
import Auth from "../api/Auth";
import {
  UnorderedListOutlined,
  HomeOutlined,
  DeliveredProcedureOutlined,
  LoginOutlined,
  PlusCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo3.png";
import "./index.css";
import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import ProductByBrand from "../pages/ProductByBrand";
import ProductByCate from "../pages/ProductByCate";

export default function Layouts() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const inputRef1 = useRef();
  const inputRef2 = useRef();
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  useEffect(() => {
    Auth.getDetail(JSON.parse(localStorage.getItem("token"))).then((res) => {
      setUserDetail(res.data);
    });
  }, []);
  useEffect(() => {
    BrandsAPI.getBrands().then((res) => {
      setBrands(res.data);
    });
  }, []);
  useEffect(() => {
    CategoriesAPI.getCategories().then((res) => {
      setCategories(res.data);
    });
  }, []);
  const addcate = (cateName) => {
    const cate = {
      name: cateName,
    };
    CategoriesAPI.addCategory(cate)
      .then((res) => {
        setTimeout(() => window.location.reload(), 500);
      })
      .catch((err) => {});
  };
  const addbrand = (brandName) => {
    const brand = {
      name: brandName,
    };
    BrandsAPI.addBrand(brand)
      .then((res) => {
        setTimeout(() => window.location.reload(), 500);
      })
      .catch((err) => {});
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={logout} danger icon={<LoginOutlined />}>
        Log out
      </Menu.Item>
    </Menu>
  );
  const menuAddCate = (
    <Menu>
      <Menu.Item key="0">
        <Input
          ref={inputRef1}
          placeholder="Input Category Name"
          suffix={
            <Button
              icon={<CheckOutlined />}
              onClick={(e) => {
                addcate(inputRef1.current.state.value);
              }}
            ></Button>
          }
        />
      </Menu.Item>
    </Menu>
  );
  const menuAddBrand = (
    <Menu>
      <Menu.Item key="0">
        <Input
          ref={inputRef2}
          placeholder="Input Brand Name"
          suffix={
            <Button
              icon={<CheckOutlined />}
              onClick={(e) => {
                addbrand(inputRef2.current.state.value);
              }}
            ></Button>
          }
        />
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Router>
        <Header
          theme="dark"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "10px",
            position: "fixed",
            zIndex: 999,
            width: "100%",
          }}
          className="header"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "10%",
            }}
          >
            <a href="/home" style={{ display: "flex" }}>
              <img width="60px" height="100%" src={logo} alt="logo" />
            </a>
          </div>
          <div
            style={{
              display: "flex",
              width: "75%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <marquee style={{ color: "white" }}>
              Welcome to Van Tech Company Administator Web
            </marquee>
          </div>
          <div
            style={{
              display: "flex",
              width: "15%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p>{userDetail && userDetail.name} </p>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Layout style={{ height: "100vh" }}>
          {categories && brands && (
            <Sider
              breakpoint="lg"
              theme="dark"
              style={{
                position: "relative",
                top: 64,
                zIndex: 1,
                height: "91.5%",
                overflowY: "scroll",
              }}
            >
              <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link to="/home"> Home </Link>
                </Menu.Item>
                <SubMenu
                  key="sub2"
                  icon={<UnorderedListOutlined />}
                  title="Categories"
                >
                  {categories.map((category) => {
                    return (
                      <Menu.Item
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        {/* icon={<FontAwesomeIcon icon={faCoffee} />} */}
                        <Link
                          to={`/products/category/${category.name}/${category._id}`}
                        >
                          {category.name}
                        </Link>
                      </Menu.Item>
                    );
                  })}
                  <Menu.Item>
                    <Dropdown
                      overlay={menuAddCate}
                      trigger={["click"]}
                      placement="bottomCenter"
                      visible={visible}
                      onClick={() => {
                        setVisible(!visible);
                      }}
                    >
                      <PlusCircleOutlined />
                    </Dropdown>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<UnorderedListOutlined />}
                  title="Brands"
                >
                  {brands.map((brand) => {
                    return (
                      <Menu.Item>
                        {/* icon={<FontAwesomeIcon icon={faCoffee} />} */}
                        <Link to={`/products/brand/${brand.name}/${brand._id}`}>
                          {brand.name}{" "}
                        </Link>
                      </Menu.Item>
                    );
                  })}
                  <Menu.Item>
                    <Dropdown
                      overlay={menuAddBrand}
                      trigger={["click"]}
                      placement="bottomCenter"
                      visible={visible}
                      onClick={() => {
                        setVisible(!visible);
                      }}
                    >
                      <PlusCircleOutlined />
                    </Dropdown>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub4"
                  icon={<DeliveredProcedureOutlined />}
                  title="Orders"
                >
                  <Menu.Item key="8">
                    <Link to="/orders/status/Submitted"> Submitted </Link>
                  </Menu.Item>
                  <Menu.Item key="9">
                    <Link to="/orders/status/Processing"> Processing </Link>
                  </Menu.Item>
                  <Menu.Item key="10">
                    <Link to="/orders/status/Shipping"> Shipping </Link>
                  </Menu.Item>
                  <Menu.Item key="11">
                    <Link to="/orders/status/Cancel"> Cancel </Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
          )}
          <Layout style={{ backgroundColor: "white", height: "100vh" }}>
            <Switch>
              <Content
                style={{
                  padding: "10px",
                  backgroundColor: "white",
                  marginTop: 64,
                }}
              >
                <Route exact path="/home" component={Home} />
                <Route
                  exact
                  path="/products/category/:name/:id"
                  component={ProductByCate}
                />
                <Route
                  exact
                  path="/products/brand/:name/:id"
                  component={ProductByBrand}
                />
                <Route exact path="/orders/status/:state" component={Orders} />
              </Content>
            </Switch>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}
