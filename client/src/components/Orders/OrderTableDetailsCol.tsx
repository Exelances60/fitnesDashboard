import React from "react";
import { Button } from "antd";
import { useAppDispatch } from "@/store/store";
import { showModal } from "@/store/slices/modalSlice";
import { setShowDrawer } from "@/store/slices/drawerSlice";
import OrderUpdateDrawer from "./OrderModals/OrderUpdateDrawer";
import OrderUpdateDrawerFooter from "./OrderModals/OrderUpdateDrawerFooter";
import OrderDetailModal from "./OrderModals/OrderDetailModal";
import { CheckOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";

type OrderTableDetailsColProps = {
  record: OrdersType;
  handleCompleteOrder: (orderId: string) => void;
};

const OrderTableDetailsCol = ({
  record,
  handleCompleteOrder,
}: OrderTableDetailsColProps) => {
  const t = useTranslations("Order.OrderContainer");
  const dispatch = useAppDispatch();

  const openDetailModal = (selectedOrderFuc: OrdersType) => {
    if (selectedOrderFuc) {
      dispatch(
        showModal({
          children: <OrderDetailModal selectedOrder={selectedOrderFuc} />,
          title: t("orderDetails"),
        })
      );
    }
  };

  const openUpdateDrawer = (selectedOrderFuc: OrdersType) => {
    if (selectedOrderFuc) {
      dispatch(
        setShowDrawer({
          children: <OrderUpdateDrawer selectedOrder={selectedOrderFuc} />,
          title: t("updateOrder"),
          footer: <OrderUpdateDrawerFooter />,
        })
      );
    }
  };
  return (
    <div className="flex gap-2">
      <Button
        type="primary"
        onClick={() => {
          openDetailModal(record);
        }}
      >
        {t("details")}
      </Button>
      <Button
        type="primary"
        ghost
        onClick={() => {
          openUpdateDrawer(record);
        }}
      >
        {t("update")}
      </Button>
      <Button
        type="primary"
        ghost
        icon={<CheckOutlined />}
        style={{
          backgroundColor: "#2dc56c",
          color: "white",
          borderColor: "#2dc56c",
        }}
        onClick={() => {
          handleCompleteOrder(record._id);
        }}
      >
        {t("complete")}
      </Button>
    </div>
  );
};

export default OrderTableDetailsCol;
