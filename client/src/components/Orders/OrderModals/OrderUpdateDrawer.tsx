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
import { justRequired, minAmount } from "@/utils/FormRules";

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
  console.log("selectedOrder", selectedOrder);
  const showMessage = useMessage();
  const dispath = useAppDispatch();
  const [form] = Form.useForm();
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

    if (
      values.amount > selectedOrder?.products[0]?.amount ||
      !selectedOrder?.products
    ) {
      showMessage(
        "The amount you entered is more than the amount of the product",
        "error"
      );
      return;
    }

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
        form={form}
        id="updateOrderForm"
      >
        <Form.Item
          label="Order Owner"
          name="orderOwner"
          rules={justRequired}
          required
        >
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="adress" rules={justRequired} required>
          <Input />
        </Form.Item>
        <Form.Item
          label="Order Owner Email"
          name="orderOwnerEmail"
          rules={justRequired}
          required
        >
          <Input />
        </Form.Item>
        <div className="flex justify-evenly">
          <Form.Item
            label="Order Status"
            name="status"
            rules={justRequired}
            required
          >
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
          <Form.Item
            label="Amount"
            name="amount"
            rules={[...justRequired, ...minAmount]}
          >
            <Input
              onChange={(e) => {
                const value = e.target.value;
                form.setFieldsValue({
                  totalPrice: Number(value) * selectedOrder?.products[0].price,
                });
              }}
            />
          </Form.Item>
        </div>
        <Form.Item label="Total Price" name="totalPrice" rules={justRequired}>
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default OrderUpdateDrawer;
