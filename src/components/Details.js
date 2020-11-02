import React, { useState } from "react";
import { Drawer, Divider, Col, Row, Image, Tabs } from "antd";
import _ from "lodash";
import ShowMore from "react-show-more";
// dung _.get(object, key) tra ve gia tri cua key cho du key o ngon ngu khac english key la string
export default function Details(props) {
  const onClose = props.onClose;
  const visible = props.visible;
  const item = props.item;
  const detail = props.item.product_detail;
  const images = props.item.image;
  var Images = [];
  var keys = [];
  {
    detail && (keys = Object.keys(detail));
  }
  {
    detail && (Images = Object.values(images));
  }
  const DescriptionItem = ({ title, content }) => (
    <div className="site-description-item-profile-wrapper">
      <p className="site-description-item-profile-p-label">
        <b style={{ fontSize: 16 }}>{title}</b>
        <span>: {content}</span>
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
        <Divider />
        <h1 className="site-description-item-profile-p">Images</h1>
        <Row>
          <Tabs
            defaultActiveKey="0"
            tabPosition={"left"}
            style={{ height: 220 }}
          >
            {Images.length > 0
              ? Images.map((Imagee, index) => {
                  return (
                    <TabPane tab={index + 1} key={index}>
                      <Image height="220px" width="300px" src={Imagee} />
                      <p>{Imagee}</p>
                    </TabPane>
                  );
                })
              : ""}
          </Tabs>
        </Row>
        <Divider />
        <h1 className="site-description-item-profile-p">Details</h1>
        <Row>
          <Col span={24}>
            {keys.length > 0
              ? keys.map((key) => {
                  return (
                    <DescriptionItem title={key} content={_.get(detail, key)} />
                  );
                })
              : ""}
          </Col>
        </Row>
        <Divider />
        <h1 className="site-description-item-profile-p">Description</h1>
        <Row>
          <Col span={24}>
            {/* <DescriptionItem content={item.description} /> */}
            <ShowMore
              lines={2}
              more="Show more"
              less="Show less"
              anchorClass=""
            >
              {item.description}
            </ShowMore>
          </Col>
        </Row>
      </Drawer>
    </div>
  );
}
