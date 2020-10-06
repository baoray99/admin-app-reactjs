import React, { Component } from "react";
import { Layout, Menu, Avatar, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  faKeyboard,
  faMouse,
  faSdCard,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import Laptops from "../pages/Laptops";
import Pcs from "../pages/Pcs";
import Keyboards from "../pages/Keyboards";
import Mouses from "../pages/Mouses";
import Monitors from "../pages/Monitors";
import GraphicCards from "../pages/GraphicCards";
import Home from "../pages/Home";
import {
  UnorderedListOutlined,
  HomeOutlined,
  UserOutlined,
  LaptopOutlined,
  DesktopOutlined,
  AudioOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo.jpg";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

export default class Layouts extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <div>
        <Router>
          <Header
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              padding: "10px",
              backgroundColor: "white",
              position: "fixed",
              zIndex: 1,
              width: "100%",
              background: "rgb(2,0,36)",
              background:
                "linear-gradient(111deg, rgba(2,0,36,1) 0%, rgba(0,255,226,1) 50%, rgba(0,212,255,1) 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "15%",
              }}
            >
              <img width="80px" height="100%" src={logo} alt="logo" />
            </div>
            <div
              style={{
                display: "flex",
                width: "75%",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Search
                style={{
                  width: "500px",
                }}
                placeholder="input search text"
                enterButton="Search"
                size="large"
                suffix={suffix}
                onSearch={(value) => console.log(value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "25%",
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Avatar size={35} icon={<UserOutlined />} />
            </div>
          </Header>
          <Layout style={{ minHeight: "690px" }}>
            <Sider
              theme="light"
              style={{
                marginTop: 64,
              }}
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
            >
              <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
                <Menu.Item key="1" icon={<HomeOutlined />}>
                  <Link to="/"> Home </Link>
                </Menu.Item>
                <SubMenu
                  key="sub2"
                  icon={<UnorderedListOutlined />}
                  title="Category"
                >
                  <Menu.Item key="2" icon={<LaptopOutlined />}>
                    <Link to="/laptops"> Laptop </Link>
                  </Menu.Item>

                  <Menu.Item key="3" icon={<DesktopOutlined />}>
                    <Link to="/pcs"> PC </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="4"
                    icon={<FontAwesomeIcon icon={faKeyboard} />}
                  >
                    <Link to="/keyboards"> &nbsp; Keyboard </Link>
                  </Menu.Item>
                  <Menu.Item key="5" icon={<FontAwesomeIcon icon={faMouse} />}>
                    <Link to="/mouses"> &nbsp; Mouses </Link>{" "}
                  </Menu.Item>
                  <Menu.Item key="6" icon={<FontAwesomeIcon icon={faTv} />}>
                    <Link to="/monitors"> &nbsp; Monitors </Link>{" "}
                  </Menu.Item>
                  <Menu.Item key="7" icon={<FontAwesomeIcon icon={faSdCard} />}>
                    <Link to="/graphiccards"> &nbsp; GraphicCards </Link>{" "}
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<UserOutlined />} title="User">
                  <Menu.Item key="8">User1</Menu.Item>
                  <Menu.Item key="9">User2</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout style={{ backgroundColor: "white" }}>
              <Content
                style={{
                  padding: "10px",
                  backgroundColor: "white",
                  marginTop: 64,
                }}
              >
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/laptops" component={Laptops} />
                  <Route exact path="/pcs" component={Pcs} />
                  <Route exact path="/keyboards" component={Keyboards} />
                  <Route exact path="/mouses" component={Mouses} />
                  <Route exact path="/monitors" component={Monitors} />
                  <Route exact path="/graphiccards" component={GraphicCards} />
                </Switch>
              </Content>
              <Footer>Footer</Footer>
            </Layout>
          </Layout>
        </Router>
      </div>
    );
  }
}
