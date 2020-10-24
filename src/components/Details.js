import React from "react";
import { Drawer, Divider, Col, Row, Image, Tabs } from "antd";

export default function Details(props) {
  const onClose = props.onClose;
  const visible = props.visible;
  const item = props.item;
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">
        {title}: {content}
      </p>
    </div>
  );
  const { TabPane } = Tabs;
  return (
    <div>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <h1 className="site-description-item-profile-p">{props.title}</h1>
        <Divider />
        <Row>
          <Col span={12}>
            <DescriptionItem title="Name" content={item.name} />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Brand" content={item.brand} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Origin" content={item.madeIn} />
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <DescriptionItem title="Price" content={item.price} />
          </Col>
          <Col span={8}>
            <DescriptionItem title="Sale-price" content={item.sales_price} />
          </Col>
          <Col span={8}>
            <DescriptionItem title="Quantity" content={item.quantity} />
          </Col>
        </Row>
        <Divider />
        <h1 className="site-description-item-profile-p">Description</h1>
        <Row>
          <Col span={12}>
            <DescriptionItem title="Size" content={item.size} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="Color" content={item.color} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Image" />
          </Col>
        </Row>
        <Row>
          <Tabs
            defaultActiveKey="1"
            tabPosition={"left"}
            style={{ height: 220 }}
          >
            <TabPane tab="Image 1" key="1">
              <Image height="220px" width="220px" src={item.Image} />
            </TabPane>
            <TabPane tab="Image 2" key="2">
              <Image height="220px" width="220px" src={item.Image} />{" "}
            </TabPane>
            <TabPane tab="Image 3" key="3">
              <Image height="220px" width="220px" src={item.Image} />
            </TabPane>
            <TabPane tab="Image 4" key="4">
              <Image height="220px" width="220px" src={item.Image} />
            </TabPane>
            ))
          </Tabs>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem title="Description" content={item.description} />
          </Col>
        </Row>
      </Drawer>
    </div>
  );
}
