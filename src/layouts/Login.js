import React, { useState } from "react";
import logo from "../assets/logo3.png";
import { Form, Input, Button, Checkbox } from "antd";
import Auth from "../api/Auth";
import { useHistory } from "react-router-dom";
import { Modal } from "antd";

export default function Login() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 12 }, //offset la vi tri
  };

  const onFinish = (values) => {
    setLoading(true);
    Auth.login(values.username, values.password)
      .then((res) => {
        setLoading(false);
        history.push("/home");
        success();
      })
      .catch((err) => {
        error();
        setLoading(false);
      });
  };
  function success() {
    Modal.success({
      content: "Login Successfully",
    });
  }

  function error() {
    Modal.error({
      title: "ERROR",
      content: "Login Fail",
    });
  }
  return (
    <div>
      <div
        style={{
          backgroundColor: "#001529",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "75%",
            width: "75%",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              width: 300,
              height: 300,
              backgroundColor: "#001529",
              borderRadius: "100%",
              marginTop: -300,
            }}
          >
            <img
              width="80"
              height="80"
              src={logo}
              alt="logo"
              style={{ marginBottom: 60 }}
            ></img>
          </div>
          <div
            style={{
              marginTop: 50,
            }}
          >
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    backgroundColor: "#001529",
                    borderColor: "#001529",
                  }}
                  loading={loading}
                  disabled={loading}
                >
                  {loading ? "Submiting" : "Submit"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
