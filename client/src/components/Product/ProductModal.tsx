"use client";
import React, { useState } from "react";
import { Button, Modal, Form, Input, Upload } from "antd";

const ProductModal = () => {
  const [addProductModal, setAddProductModal] = useState(false);
  const [imageUrl, setImageUrl] = useState<File | null>(null);

  const openAddProductModal = () => {
    setAddProductModal(true);
  };

  const handleFinish = async (values: any) => {
    //setAddProductModal(false);
  };

  return (
    <div className="text-2xl font-bold text-[#202224] flex w-full justify-between">
      Product
      <Button className="shadow p-5" onClick={openAddProductModal}>
        Add Product
      </Button>
      <Modal
        title="Add Product"
        open={addProductModal}
        footer={[
          <Button key="cancel" onClick={() => setAddProductModal(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            form="addProductForm"
            htmlType="submit"
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          id="addProductForm"
          onFinish={handleFinish}
          className="w-full flex flex-col gap-[10px] justify-center"
          layout="vertical"
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              { required: true, message: "Please Input your Product Name!" },
            ]}
          >
            <Input placeholder="Enter Product Name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="productDescription"
            rules={[
              {
                required: true,
                message: "Please Input your Product Description!",
              },
            ]}
          >
            <Input.TextArea placeholder="Enter Product Description" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="productPrice"
            rules={[
              { required: true, message: "Please Input your Product Price!" },
            ]}
          >
            <Input prefix="&#8378;" suffix="TL" type="number" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: "Please Input your Product Amount!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          {/*       <Form.Item
            label="Image"
            name="productImage"
            rules={[
              { required: true, message: "Please Input your Product Image!" },
            ]}
          >
            <Upload listType="picture" maxCount={1}>
              <Button>Upload</Button>
            </Upload>
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default ProductModal;
