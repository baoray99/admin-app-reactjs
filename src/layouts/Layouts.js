import { Layout, Menu, Avatar, Input, Dropdown } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import {
//   faKeyboard,
//   faMouse,
//   faSdCard,
//   faCoffee,
//   faTv,
// } from "@fortawesome/free-solid-svg-icons";
import Laptops from "../pages/Laptops";
import Pcs from "../pages/Pcs";
import Keyboards from "../pages/Keyboards";
import Mouses from "../pages/Mouses";
import Monitors from "../pages/Monitors";
import GraphicCards from "../pages/GraphicCards";
import Home from "../pages/Home";
import Customers from "../pages/Customers";
import AddLaptop from "../pages/Addproduct";
import EditLaptop from "../pages/Editproduct";
import CategoriesAPI from "../api/CategoriesAPI";
import BrandsAPI from "../api/BrandAPI";
import {
  UnorderedListOutlined,
  HomeOutlined,
  UserOutlined,
  AudioOutlined,
  DownOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo3.png";
import "./index.css";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ProductByBrand from "../pages/ProductByBrand";

export default function Layouts() {
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  // const [collapsed, setCollapsed] = useState(false);
  // const onCollapse = (collapsed) => {
  //   setCollapsed(collapsed);
  // };
  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;
  const { Search } = Input;
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/login");
  };
  useEffect(() => {
    BrandsAPI.getBrands().then((res) => {
      setBrands(res.data);
    });
  });
  useEffect(() => {
    CategoriesAPI.getCategories().then((res) => {
      setCategories(res.data);
      // console.log(res.data)
    });
  }, []);

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );

  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          Profile
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          Edit
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          Change Avatar
        </a>
      </Menu.Item>
      <Menu.Item onClick={logout} danger icon={<LoginOutlined />}>
        Log out
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
              width: "80%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Search
              style={{
                width: "500px",
              }}
              placeholder="Search..."
              enterButton="Search"
              size="large"
              suffix={suffix}
              onSearch={(value) => console.log(value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "10%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Dropdown overlay={menu}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
                style={{ color: "white" }}
              >
                Baoray <DownOutlined />
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
              // collapsible
              // collapsed={collapsed}
              // onCollapse={onCollapse}
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
                      <Menu.Item>
                        {/* icon={<FontAwesomeIcon icon={faCoffee} />} */}
                        <Link
                          to={`/products/category/${category.name}/${category._id}`}
                        >
                          {category.name}{" "}
                        </Link>
                      </Menu.Item>
                    );
                  })}
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
                </SubMenu>
                <SubMenu key="sub4" icon={<UserOutlined />} title="Users">
                  <Menu.Item key="8">
                    <Link to="/customers"> Customers </Link>
                  </Menu.Item>
                  <Menu.Item key="9">Salers</Menu.Item>
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
                  // marginLeft: collapsed ? 80 : 200,
                }}
              >
                <Route exact path="/home" component={Home} />
                <Route
                  exact
                  path="/products/category/Laptop/:id"
                  component={Laptops}
                />
                <Route exact path="/products/category/Pc/:id" component={Pcs} />
                <Route
                  exact
                  path="/products/category/Keyboard/:id"
                  component={Keyboards}
                />
                <Route
                  exact
                  path="/products/category/Mouses/:id"
                  component={Mouses}
                />
                <Route
                  exact
                  path="/products/category/Monitors/:id"
                  component={Monitors}
                />
                <Route
                  exact
                  path="/products/category/GraphicCards/:id"
                  component={GraphicCards}
                />
                <Route
                  exact
                  path="/products/brand/:name/:id"
                  component={ProductByBrand}
                />

                <Route exact path="/customers" component={Customers} />
                <Route exact path="/laptop/add" component={AddLaptop} />
                <Route exact path="/laptop/edit/:id" component={EditLaptop} />
              </Content>
            </Switch>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}
