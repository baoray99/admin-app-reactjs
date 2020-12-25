import React, { Component } from "react";
import { Card, Divider } from "antd";
import Nhan from "../assets/132847837_1238329233235814_7790797218859865692_n.jpg";
import Bao from "../assets/IMG_20200127_222247.jpg";
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
                  src="https://scontent-xsp1-2.xx.fbcdn.net/v/t1.0-9/51451747_1501926116605534_9056755725568573440_n.jpg?_nc_cat=102&ccb=2&_nc_sid=174925&_nc_ohc=tV9wmWp1_oAAX-emSG0&_nc_ht=scontent-xsp1-2.xx&oh=039f02c4ab3aaf0ee8d4dc12685e91e6&oe=6007DC14"
                />
              }
            >
              <Meta title="Nguyễn Tiến Văn" description="www.instagram.com" />
            </Card>
            <Card
              hoverable
              style={{ width: 360 }}
              cover={<img alt="example" src={Nhan} />}
            >
              <Meta title="Trần Nhàn" description="www.instagram.com" />
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
                  src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/51720780_353071358869665_6557451974705414144_o.jpg?_nc_cat=108&ccb=2&_nc_sid=8bfeb9&_nc_ohc=6hgaRv05ZSMAX_TqfWi&_nc_ht=scontent-xsp1-1.xx&oh=2268277f3a1f073910ffbbf718112494&oe=600A1E28"
                />
              }
            >
              <Meta title="Phan Văn Hoan" description="www.instagram.com" />
            </Card>
            <Card
              hoverable
              style={{ width: 360 }}
              cover={
                <img
                  alt="example"
                  src="https://scontent-xsp1-1.xx.fbcdn.net/v/t1.0-9/109708594_2129824297161539_7152905746468529870_o.jpg?_nc_cat=108&ccb=2&_nc_sid=730e14&_nc_ohc=NVpgBCbudU8AX92FP34&_nc_ht=scontent-xsp1-1.xx&oh=d193a3839f926b358c3760f09cbab62f&oe=6009D32C"
                />
              }
            >
              <Meta title="Phan Thanh Huy" description="www.instagram.com" />
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
              cover={<img alt="example" src={Bao} />}
            >
              <Meta title="Lê Thái Bảo" description="www.instagram.com" />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
