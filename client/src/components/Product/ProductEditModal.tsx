import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { productsType } from "@/models/dataTypes";
import { useRouter } from "next/navigation";
import axiosClient from "@/utils/AxiosClient";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  selectEditModalVisible,
  selectProduct,
  setEditModalVisible,
} from "@/store/slices/productPageSlice";

type ProductEditModalType = {
  editModalVisible: boolean;
  setEditModalVisible: (value: boolean) => void;
  product: productsType;
};

const ProductEditModal = (
  {
    /*editModalVisible,
  setEditModalVisible,
  product, */
  }
) => {
  const product = useAppSelector(selectProduct);
  const router = useRouter();
  const [form] = Form.useForm();
  const editModalVisible = useAppSelector(selectEditModalVisible);
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<any>();

  useEffect(() => {
    form.setFieldsValue({
      name: product.name,
      description: product.description,
      price: product.price,
      amount: product.amount,
    });
  }, [product, form]);

  const closeModal = () => {
    dispatch(setEditModalVisible(false));
  };

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("amount", values.amount);
    if (file) {
      formData.append("image", file);
    }
    try {
      const response = await axiosClient.put(
        `http://localhost:8080/products/update-product/${product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        message.success("Product updated successfully");
        closeModal();
        router.refresh();
      }
    } catch (error) {
      message.error("An error occurred");
    }
  };

  return (
    <Modal
      title="Edit Product"
      open={editModalVisible}
      onCancel={closeModal}
      footer={[
        <Button key="cancel" onClick={closeModal}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          form="editProductForm"
          htmlType="submit"
        >
          Submit
        </Button>,
      ]}
    >
      <Form
        initialValues={product}
        form={form}
        onFinish={handleFinish}
        id="editProductForm"
        encType="multipart/form-data"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              min: 5,
              message: "Description is required or too short",
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
        <Form.Item label="Image" name="image">
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
  );
};

export default ProductEditModal;
