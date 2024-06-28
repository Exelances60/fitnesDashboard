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
import { useTranslations } from "next-intl";

type OrderUpdateDrawerProps = {
  selectedOrder: OrdersType;
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
  const t = useTranslations("Order.OrderContainer");
  const showMessage = useMessage();
  const dispath = useAppDispatch();
  const [form] = Form.useForm();
  const optionRender = (item: any) => {
    return (
      <div className="flex gap-2 items-center">
        {item.label === "Preparing" || item.label === "Hazırlanıyor" ? (
          <Image src={preparingImage} alt="preparing" width={25} height={25} />
        ) : item.label === "Pending" || item.label === "Gönderimde" ? (
          <Image src={delivaryImage} alt="delivary" width={25} height={25} />
        ) : item.label === "Completed" || item.label === "Tamamlandı" ? (
          <CheckOutlined className="text-xl" />
        ) : (
          <CloseOutlined className="text-xl" />
        )}
        {item.label}
      </div>
    );
  };
  const onFinish = async (values: updateFormType) => {
    showMessage(t("loading"), "loading", 0.3);

    if (
      ((values.amount > selectedOrder?.products[0]?.amount) as any) ||
      !selectedOrder?.products
    ) {
      showMessage(t("amountMoreThanStock"), "error");
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
        showMessage(t("orderUpdated"), "success", 2);
        dispath(setHideDrawer());
      }
    } catch (error: any) {
      showMessage(error.response.data.errorMessage || "Failed", "error", 2);
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
          label={t("orderOwner")}
          name="orderOwner"
          rules={justRequired}
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("address")}
          name="adress"
          rules={justRequired}
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("orderOwnerEmail")}
          name="orderOwnerEmail"
          rules={justRequired}
          required
        >
          <Input />
        </Form.Item>
        <div className="flex justify-evenly">
          <Form.Item
            label={t("orderStatus")}
            name="status"
            rules={justRequired}
            required
          >
            <Select
              style={{ width: 250 }}
              placement="bottomRight"
              options={[
                { label: t("pending"), value: "Pending" },
                { label: t("completed"), value: "Completed" },
                { label: t("canceled"), value: "Cancelled" },
                { label: t("preparing"), value: "Preparing" },
              ]}
              optionRender={optionRender}
              tagRender={(props) => (
                <div className="text-blue-500">{props.label} asdasd</div>
              )}
            />
          </Form.Item>
          <Form.Item
            label={t("amount")}
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
        <Form.Item
          label={t("totalPrice")}
          name="totalPrice"
          rules={justRequired}
        >
          <Input />
        </Form.Item>
      </Form>
    </>
  );
};

export default OrderUpdateDrawer;
