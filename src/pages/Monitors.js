import React, { Component } from "react";
import { Table, Tag, Space } from "antd";
export default class Monitors extends Component {
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
      },

      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Sale_Price",
        key: "sale_price",
        dataIndex: "sale_price",
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
        title: "Origin",
        dataIndex: "origin",
        key: "origin",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Color",
        dataIndex: "color",
        key: "color",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
      },
      {
        title: "Desciption",
        dataIndex: "description",
        key: "description",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Space size="middle">
            <a>
              More Details
              {/* {record.name} */}
            </a>
            <a>Edit</a>
            <a>Delete</a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: "1",
        name: "Lenovo Yoga 710",
        brand: "Lenovo",
        price: "12.000.000",
        // tags: ["nice", "developer"],
        sale_price: "14.000.000",
        origin: "USA",
        quantity: 10,
        size: "",
        color: "Gray",
        image: "",
        description: "",
      },
      {
        key: "2",
        name: "Lenovo Yoga 710",
        brand: "Lenovo",
        price: "12.000.000",
        // tags: ["nice", "developer"],
        sale_price: "14.000.000",
        origin: "USA",
        quantity: 10,
        size: "",
        color: "Gray",
        image: "",
        description: "",
      },
      {
        key: "3",
        name: "Lenovo Yoga 710",
        brand: "Lenovo",
        price: "12.000.000",
        // tags: ["nice", "developer"],
        sale_price: "14.000.000",
        origin: "USA",
        quantity: 10,
        size: "",
        color: "Gray",
        image: "",
        description: "",
      },
    ];

    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}
