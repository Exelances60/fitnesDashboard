import React from "react";
import { Form, Input, Select } from "antd";
import delivaryImage from "@/../public/orders/delivary.png";
import preparingImage from "@/../public/orders/preparing.png";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import axiosClient from "@/utils/AxiosClient";
import useMessage from "@/hooks/useMessage";
import { useAppDispatch } from "@/store/store";
import { setHideDrawer } from "@/store/slices/drawerSlice";
import { OrdersType } from "@/types/Order";

type OrderUpdateDrawerProps = {
  selectedOrder: OrdersType | null;
};

type updateFormType = {
  orderOwner: string;
  adress: string;
  orderOwnerEmail: string;
  totalPrice: number;
  status: "Pending" | "Completed" | "Cancelled" | "Preparing";
  amount: number;
};

const OrderUpdateDrawer = ({ selectedOrder }: OrderUpdateDrawerProps) => {
  const showMessage = useMessage();
  const dispath = useAppDispatch();
  const optionRender = (item: any) => {
    return (
      <div className="flex gap-2 items-center">
        {item.label === "Preparing" ? (
          <Image src={preparingImage} alt="preparing" width={25} height={25} />
        ) : item.label === "Pending" ? (
          <Image src={delivaryImage} alt="delivary" width={25} height={25} />
        ) : item.label === "Completed" ? (
          <CheckOutlined className="text-xl" />
        ) : (
          <CloseOutlined className="text-xl" />
        )}
        {item.label}
      </div>
    );
  };
  const onFinish = async (values: updateFormType) => {
    showMessage("Loading.. With Hooks", "loading", 0.3);
    const updatedOrder = {
      ...selectedOrder,
      ...values,
      amount: parseInt(values.amount.toString()),
      totalPrice: parseInt(values.totalPrice.toString()),
    };

    try {
      const response = await axiosClient.put("/orders/update-order", {
        params: {
          orderId: selectedOrder?._id,
        },
        data: updatedOrder,
      });
      if (response.status === 200) {
        showMessage("Order updated successfully", "success", 2);
        /*        setUpdateOrderDrawerVisible(false); */
        dispath(setHideDrawer());
      }
    } catch (error: any) {
      showMessage(error.message || "An error occurred", "error");
    }
  };

  return (
    <>
      <Form
        layout="vertical"
        initialValues={selectedOrder || []}
        onFinish={onFinish}
        id="updateOrderForm"
      >
        <Form.Item label="Order Owner" name="orderOwner">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="adress">
          <Input />
        </Form.Item>
        <Form.Item label="Order Owner Email" name="orderOwnerEmail">
          <Input />
        </Form.Item>
        <div className="flex justify-evenly">
          <Form.Item label="Order Status" name="status">
            <Select
              defaultValue={selectedOrder?.status}
              style={{ width: 250 }}
              placement="bottomRight"
              options={[
                { label: "Pending", value: "Pending" },
                { label: "Completed", value: "Completed" },
                { label: "Cancelled", value: "Cancelled" },
                { label: "Preparing", value: "Preparing" },
              ]}
              optionRender={optionRender}
              tagRender={(props) => (
                <div className="text-blue-500">{props.label} asdasd</div>
              )}
            />
          </Form.Item>
          <Form.Item label="Amount" name="amount">
            <Input />
          </Form.Item>
        </div>
        <Form.Item label="Total Price" name="totalPrice">
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default OrderUpdateDrawer;
