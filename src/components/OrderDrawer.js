import React, { useState } from "react";
import { Drawer, Divider, Col, Row, Image, Tabs } from "antd";

export default function OrderDrawer(props) {
  const visible = props.visible;
  const onClose = props.onClose;
  const item = props.item;
  const orders = props.item.orderItem;
  //   var Orders = [];
  //   {
  //     item && (Orders = Object.values(orders));
  //   }
  return (
    <div>
      <Drawer
        title="All Items Ordered"
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Row>
          {orders && orders.length > 0
            ? orders.map((order) => {
                return (
                  <div>
                    <p>Name: {order.product_name}</p>
                    <p>Quantity: {order.quantity}</p>
                    <p>Price: {order.price}</p>
                    <Divider />
                  </div>
                );
              })
            : ""}
        </Row>
      </Drawer>
    </div>
  );
}
