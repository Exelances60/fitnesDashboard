"use client";
import React, { useState } from "react";
import { Button, Modal, Input, Form, Upload, message } from "antd";
import { getCookie } from "cookies-next";
import useSelectUserInfo from "@/hooks/useSelectUserInfo";
import { useRouter } from "next/navigation";

const ProductModal = () => {
  const router = useRouter();
  const [addProductModal, setAddProductModal] = useState(false);
  const [file, setFile] = useState<any>();
  const userInfo = useSelectUserInfo();

  const openAddProductModal = () => {
    setAddProductModal(true);
  };

  const handleFinish = async (values: any) => {
    if (userInfo === null) return;
    message.loading("Adding product", 1);
    const token = getCookie("token");
    const formData = new FormData();
    formData.append("productName", values.productName);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("amount", values.amount);
    formData.append("ownerId", userInfo?._id);
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://localhost:8080/products/add-product",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setAddProductModal(false);
        message.success("Product added successfully");
        router.refresh();
      }
    } catch (error) {}
  };

  return (
    <div className="text-2xl font-bold text-[#202224] flex w-full justify-between">
      Product
      <Button className="shadow p-5" onClick={openAddProductModal}>
        Add Product
      </Button>
      <Modal
        title="Add Product"
        onCancel={() => {
          setAddProductModal(false);
        }}
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
          encType="multipart/form-data"
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[
              {
                required: true,
                message: "Product Name is required or too short",
              },
              {
                min: 5,
                message: "Product Name is required or too short",
              },
            ]}
          >
            <Input placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Description is required ",
              },
              {
                min: 10,
                message: "Description or too short",
              },
            ]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price is required" }]}
          >
            <Input placeholder="Price" type="number" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Amount is required" }]}
          >
            <Input placeholder="Amount" type="number" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Image is required" }]}
          >
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture"
              maxCount={1}
              onChange={(info) => {
                setFile(info.file.originFileObj);
              }}
            >
              <Button>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductModal;
