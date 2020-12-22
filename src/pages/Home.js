import React, { Component } from "react";
import { Card, Divider } from "antd";
const { Meta } = Card;

export default class Home extends Component {
  render() {
    return (
      <div style={{ padding: "30px 40px" }}>
        <div
          style={{
            marginBottom: 40,
          }}
        >
          <p style={{ fontSize: 30 }}>All members of team</p>
        </div>
        <div
          style={{
            marginBottom: 40,
          }}
        >
          <Divider orientation="center">
            <h3>Team Backend</h3>
          </Divider>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Card
              hoverable
              style={{ width: 360 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Mobile Developer" description="www.instagram.com" />
            </Card>
            <Card
              hoverable
              style={{ width: 360 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Mobile Developer" description="www.instagram.com" />
            </Card>
          </div>
        </div>
        <div
          style={{
            marginBottom: 40,
          }}
        >
          <Divider orientation="center">
            <h3>Team Mobile</h3>
          </Divider>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Card
              hoverable
              style={{ width: 360 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Mobile Developer" description="www.instagram.com" />
            </Card>
            <Card
              hoverable
              style={{ width: 360 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Mobile Developer" description="www.instagram.com" />
            </Card>
          </div>
        </div>
        <div
          style={{
            marginBottom: 40,
          }}
        >
          <Divider orientation="center">
            <h3>Team Web</h3>
          </Divider>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Card
              hoverable
              style={{ width: 360 }}
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
            >
              <Meta title="Web Developer" description="www.instagram.com" />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
