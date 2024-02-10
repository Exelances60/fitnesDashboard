import React from "react";
import { Modal, Button, Form, Input } from "antd";
import { productsType } from "@/models/dataTypes";
import Image from "next/image";
import axiosClient from "@/utils/AxiosClient";
import useMessage from "@/hooks/useMessage";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  selectOrderModalVisible,
  selectProduct,
  setOrderModalVisible,
} from "@/store/slices/productPageSlice";

type ProductOrderModalType = {
  orderModalVisible: boolean;
  setOrderModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  product: productsType;
};

type formValuesType = {
  productName: string;
  price: number;
  amount: number;
  address: string;
  phone: string;
  email: string;
  orderOwner: string;
};

const ProductOrderModal = (
  {
    /*   orderModalVisible,
  setOrderModalVisible,
  product, */
  }
) => {
  const showMessage = useMessage();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const orderModalVisible = useAppSelector(selectOrderModalVisible);
  const formOnFinish = async (values: formValuesType) => {
    showMessage("Loading..", "loading");
    try {
      const response = await axiosClient.post("/orders/create-order", {
        ...values,
        amount: parseInt(values.amount.toString()),
        price: parseInt(values.price.toString()),
        phone: `+90${values.phone}`,
        productId: product._id,
        creator: product.ownerId,
      });
      if (response.status === 201) {
        showMessage("Order is created!", "success");
        dispatch(setOrderModalVisible(false));
      }
    } catch (error) {
      showMessage("An error occurred!", "error");
    }
  };
  return (
    <Modal
      title="Order Product"
      open={orderModalVisible}
      onCancel={() => dispatch(setOrderModalVisible(false))}
      footer={[
        <Button
          key="cancel"
          onClick={() => dispatch(setOrderModalVisible(false))}
        >
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          form="orderProduct"
          htmlType="submit"
        >
          Order
        </Button>,
      ]}
    >
      <Form
        name="orderProduct"
        layout="vertical"
        initialValues={{ productName: product.name, price: product.price }}
        onFinish={formOnFinish}
      >
        <Form.Item label="Product Name" name="productName">
          <div className="flex items-center gap-2">
            <Image
              src={`http://localhost:8080/${product.imageUrl}`}
              width={90}
              height={90}
              alt={product.name}
              className="rounded-md"
            />
            <span>{product.name}</span>
          </div>
        </Form.Item>
        <Form.Item label="Price" name="price">
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the amount of product!",
              min: 1,
              max: product.amount,
            },
          ]}
        >
          <Input type="number" max={product.amount} min={1} />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input your address!",
              min: 10,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
              min: 10,
            },
          ]}
        >
          <Input type="tel" addonBefore="+90" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Order Owner"
          name="orderOwner"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              min: 3,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductOrderModal;
